test('Dit is de test', () => {  console.log("hij doet het") });

//  const array = [{
//             title: "a",
//             date: "2021-03-29"
//         }, {
//             title: "b",
//             date: "2021-04-13"
//         }, {
//             title: "c",
//             date: "2021-04-12"
//         }, {
//             title: "leave",
//             date: "2021-06-11"
//         }, {
//             title: "d",
//             date: "2021-04-16"
//         },
//             {
//                 title: "e",
//                 date: "2021-06-18"
//             }]
//
//
//     const date = new Date()
//     const currentYearNumber = date.getFullYear().toString()
//     const currentMonth = date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2, "0");
//     console.log("currentmonth",currentMonth, "currentYear",currentYearNumber)
//
//     const filteredObjects = array.filter((filteredObject) => {
//         const datestr = currentYearNumber
//         return filteredObject.date.substring(0,4) === datestr
//     })
//
//     console.log("filteredObjects", filteredObjects)