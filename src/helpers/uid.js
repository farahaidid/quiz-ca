const uid = (count = 6) => {
   const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
   var result = '';
   for (var i = 0; i < count; i++) {
      var x = Math.floor(Math.random() * chars.length);
      result += chars[x];
   }
   return result;
}
export default uid