import {createCurrentMonthString, createCurrentYearString} from "./helpers/createDateStrings";
import metersToKilometers from "./helpers/metersToKM";
import secondsPerMeterToKMPH from "./helpers/secondsPerMeterToKMPH";

test('Dit is de test', () => {
    console.log("hij doet het")
});

test('Create month string', function () {

    //Arrange
    const currentLetter = ""
    //Act
    const result = createCurrentMonthString(currentLetter);
    //Assert
    expect(result).toEqual("2021-06")

});

test('Create year string', function () {

    //Arrange
    const currentLetter = ""
    //Act
    const result = createCurrentYearString(currentLetter);
    //Assert
    expect(result).toEqual("2021")

});

test('calculate kilometers', function () {

    //Arrange
    const secondsPerMeter = "90000"
    //Act
    const result = metersToKilometers(secondsPerMeter);
    //Assert
    expect(result).toEqual(`90 KM`)

});

test('calculate kmp/h', function () {

    //Arrange
    const secondsPerMeter = "9"
    //Act
    const result = secondsPerMeterToKMPH(secondsPerMeter);
    //Assert
    expect(result).toEqual(`32.4 KM/ph`)

});

test('filer functie', function () {

    //Arrange
    const array = [{
        title: "a",
        date: "2021-03-29"
    }, {
        title: "b",
        date: "2010-04-13"
    }, {
        title: "c",
        date: "2021-04-12"
    }, {
        title: "d",
        date: "2010-06-11"
    }, {
        title: "e",
        date: "2021-04-16"
    }, {
        title: "f",
        date: "2021-06-18"
    }]

    //Act
    const currentYearNumber = createCurrentYearString()
    const filteredObjects = array.filter((filteredObject) => {
        return filteredObject.date.substring(0, 4) === currentYearNumber
    })
    //Assert
    expect(filteredObjects).toEqual([{
        title: "a",
        date: "2021-03-29"
    }, {
        title: "c",
        date: "2021-04-12"
    },
        {
            title: "e",
            date: "2021-04-16"
        },
        {
            title: "f",
            date: "2021-06-18"
        }])

});

test('filter functie', function () {

    //Arrange
    const array = [{
        title: "a",
        date: "2021-06-29"
    }, {
        title: "b",
        date: "2010-04-13"
    }, {
        title: "c",
        date: "2021-04-12"
    }, {
        title: "d",
        date: "2010-06-11"
    }, {
        title: "e",
        date: "2021-04-16"
    }, {
        title: "f",
        date: "2021-06-18"
    }, {
        title: "g",
        date: "2021-06-19"
    }
    ]

    //Act
    const currentMonth = createCurrentMonthString()
    const filteredObjects = array.filter((filteredObject) => {
        return filteredObject.date.substring(0, 7) === currentMonth
    })
    //Assert
    expect(filteredObjects).toEqual(
        [{
            title: "a",
            date: "2021-06-29"
        }, {
            title: "f",
            date: "2021-06-18"
        }, {
            title: "g",
            date: "2021-06-19"
        }
        ])
});