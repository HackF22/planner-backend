const Course = require('../models/Course');
let validator = {

    checkAddHelper: (prerequisites, semesters, semester) => {
        let takenCoursesArr = [];
        for (const key in semesters) {
            if (key === semester) {
                break;
            }
            if (semesters.hasOwnProperty(key)) {
                semesters[key].forEach(e=>takenCoursesArr.push(e))
            }
        }
        let results = prerequisites;
        for (let i = 0; i < takenCoursesArr.length; i++){
            results = results.map(subgroup => subgroup.filter(course => course["course_id"] !== takenCoursesArr[i]))
        }
        return results.filter(subgroup => subgroup.length === 0).length > 0;
    },

    checkRemoveHelper: async (semesters, semester, course_id) => {
        let numSemesters = Object.keys(semesters).length;
        let takenCoursesArr = [];
        let takenCoursesAfterRemArr = []
        let counter = 0;
        for (const key in semesters) {
            if (key === semester) {
                break;
            }
            counter+1;
            if (semesters.hasOwnProperty(key)) {
                semesters[key].forEach(e=>takenCoursesArr.push(e))
            }
        }
        if (counter === numSemesters) {
            return true
        } else {
            let start = false;
            for (const key in semesters) {
                if (key === semester) {
                    start = true;
                    if (semesters.hasOwnProperty(key)) {
                        semesters[key].forEach(e=>{
                            if (e !== course_id) {
                                takenCoursesArr.push(e)
                            }
                        });
                    }
                } else if (start) {
                    semesters[key].forEach(e=>takenCoursesAfterRemArr.push(e))
                } else {
                    continue;
                }
            }
            for (let i = 0; i< takenCoursesAfterRemArr.length; i++) {
                let currTakenCoursesAfterRem = takenCoursesAfterRemArr[i];
                let course = await Course.findOne({course_id: currTakenCoursesAfterRem}).populate({ path: "prerequisite", model: Course, select: ['course_id', 'name']});
                let prereqs = course["prerequisite"]
                for (let j = 0; j < takenCoursesArr.length; j++){
                    prereqs = prereqs.map(subgroup => subgroup.filter(course => course["course_id"] !== takenCoursesArr[j]))
                }
                if (prereqs.filter(subgroup => subgroup.length === 0).length === 0) {
                    return false
                }
            }
            return true
        }
    },

    checkMoveHelper: () => {
        
    }

}

module.exports = validator;