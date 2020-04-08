import { ROOMS, USERS, QUESTIONS } from "../firebase/init.firebase"
import { QUESTIONS_API } from "../axios/config.axios"
import UID from "../helpers/uid"

// Timestamp of current datetime
let now = () => new Date(new Date().toISOString()).getTime()

const FETCH_ROOMS = async (limit = 15, orderBy = "createdAt") => {
   try {
      let roomsSnapshot = await ROOMS.orderBy(orderBy).limit(limit).get()
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
      usersSnapshot.forEach(user => users.push(user.data()))

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
   console.log("API -> CREATE_ROOM => ", req)
   try {
      // Conditions
      let condition = ["name", "==", req.name.toUpperCase()]

      // Getting room with condition
      let roomSnapshot = await ROOMS.where(...condition).get()

      // If room not exist
      if (roomSnapshot.empty) {

         // New Room data
         let newRoomData = {
            name: req.name.toUpperCase(), createdAt: now(),
            code: UID().toUpperCase(),
            difficulty: req.difficulty,
         }

         // Creating new room
         let newRoom = await ROOMS.add(newRoomData)

         // New user data
         let newUserData = {
            name: req.userName.toUpperCase(),
            joinedAt: now()
         }

         // Joining user to the room
         let newUser = await USERS(newRoom.id).add(newUserData)

         // Fetching questions
         let questions = (await QUESTIONS_API.get("?amount=100&difficulty=" + req.difficulty.toLowerCase())).data

         // New questions data
         let newQuestionsData = {
            amount: 100, difficulty: req.difficulty,
            questions: questions.results,
            createdAt: now(), updatedAt: now()
         }

         // Creating questions
         QUESTIONS(newRoom.id).doc("V1").set(newQuestionsData)

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
      console.log(error)
      return { error: true, message: error.message }
   }
}

const JOIN_ROOM = async req => {
   console.log("JOIN_ROOM => ", req)
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
   console.log(req)
   try {
      await USERS(req.roomId).doc(req.userId).update({ score: req.score })
      return { message: "UPDATED" }
   }
   catch (error) { return { error: true, message: error.message } }
}

export default { CREATE_ROOM, JOIN_ROOM, FETCH_ROOMS, FETCH_ROOM, UPDATE_SCORE }