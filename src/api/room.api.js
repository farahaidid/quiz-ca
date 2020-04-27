import { ROOMS, USERS, QUESTIONS } from "../firebase/init.firebase"
import { QUESTIONS_API } from "../axios/config.axios"
import UID from "../helpers/uid"

// Timestamp of current datetime
let now = () => new Date(new Date().toISOString()).getTime()

const FETCH_ROOMS = async (limit = 50, orderBy = "createdAt") => {
   try {
      let roomsSnapshot = await ROOMS.orderBy(orderBy, 'desc').limit(limit).get()
      let rooms = []
      roomsSnapshot.forEach(room => rooms.push({ id: room.id, ...room.data() }))
      return { error: false, data: rooms }
   }
   catch (error) { return { error: true, code: 500, message: error.message } }
}

const FETCH_ROOM = async name => {
   try {
      let roomSnapshot = await ROOMS.where("name", "==", name).get()
      if (roomSnapshot.empty) {
         return { error: true, message: "Room not found with the name" }
      }
      let room = roomSnapshot.docs[0]
      let usersSnapshot = await USERS(room.id).get()

      let users = []
      usersSnapshot.forEach(user => users.push(Object.assign({id: user.id},user.data())))

      let questions = await QUESTIONS(room.id).doc("V1").get()

      return {
         error: false, data: {
            id: room.id, ...room.data(),
            users, questions: questions.data()
         }
      }
   }
   catch (error) { return { error: true, code: 500, message: error.message } }
}

const CREATE_ROOM = async req => {
   try {
      // Conditions
      let condition = ["name", "==", req.name.toUpperCase()]

      // Getting room with condition
      let roomSnapshot = await ROOMS.where(...condition).get()

      // If room not exist
      if (roomSnapshot.empty) {

         // New Room data
         let newRoomData = {
            userId: req.userId,
            name: req.name.toUpperCase(), createdAt: now(),
            code: UID().toUpperCase(), noOfUsers: 1,
            difficulty: req.difficulty,
         }

         // Creating new room
         let newRoom = await ROOMS.add(newRoomData)

         // New user data
         let newUserData = {
            name: req.userName.toUpperCase(),
            joinedAt: now(),
            isApproved: true,
            isOwner: true,
         }

         // Joining user to the room
         let newUser = await USERS(newRoom.id).add(newUserData)

         // Fetching questions
         let questions = (await QUESTIONS_API.get("?amount=50&difficulty=" + req.difficulty.toLowerCase())).data
         let questions2 = (await QUESTIONS_API.get("?amount=50&difficulty=" + req.difficulty.toLowerCase())).data

         questions.results = questions.results.concat(questions2.results)

         // New questions data
         let newQuestionsData = {
            amount: 100, difficulty: req.difficulty,
            questions: questions.results,
            createdAt: now(), updatedAt: now()
         }

         // Creating questions
         await QUESTIONS(newRoom.id).doc("V1").set(newQuestionsData)

         // Returning response
         return {
            error: false, code: 200, data: {
               id: newRoom.id, ...newRoomData,
               joinedAs: { id: newUser.id, ...newUserData }
            }
         }
      }

      return { error: true, code: 409, message: "Room already exist!" }
   }
   catch (error) {
      return { error: true, message: error.message }
   }
}

const JOIN_ROOM = async req => {
   try {
      // Conditions
      let condition = [req.isCode ? "code" : "name", "==", req.isCode ? req.code : req.name.toUpperCase()]

      // Finding room with the conditions
      let roomsSnapshot = await ROOMS.where(...condition).get()

      // Returning if room not exist
      if (roomsSnapshot.empty) {
         return {
            error: true, code: 404,
            message: "No room found with the room name or room code"
         }
      }

      // Room data
      let room = roomsSnapshot.docs[0]

      // Getting user document
      let usersSnapshot = await USERS(room.id).where('name', "==", req.userName.toUpperCase()).get()

      // User already exist
      if (!usersSnapshot.empty) {
         let user = usersSnapshot.docs[0]
         return {
            error: false, code: 200, message: "JOINED", data: {
               id: room.id, ...room.data(), joinedAs: {
                  id: user.id, ...user.data()
               }
            }
         }
      }

      // Adding new user to database
      let newUserData = { name: req.userName.toUpperCase(), joinedAt: now() }
      let newUser = await USERS(room.id).add(newUserData)

      // Updating Number of users
      room.ref.update({ noOfUsers: room.data().noOfUsers + 1 })

      // Returning data
      return {
         error: false, code: 200, data: {
            id: room.id, ...room.data(),
            joinedAs: {
               id: newUser.id,
               ...newUserData
            }
         }
      }
   }
   catch (error) { return { error: true, code: 400, message: error.message } }
}

const UPDATE_SCORE = async req => {
   try {
      await USERS(req.roomId).doc(req.userId).update({ score: req.score })
      return { message: "UPDATED" }
   }
   catch (error) { return { error: true, message: error.message } }
}

export default { CREATE_ROOM, JOIN_ROOM, FETCH_ROOMS, FETCH_ROOM, UPDATE_SCORE }