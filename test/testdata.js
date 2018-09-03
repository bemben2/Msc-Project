exports.resultsToCheck = [
    { "userId": 1 },
    { "quizId": 1 },
    { "finishedAt": "Mon Sep 03 2018 15:33:46 GMT+0100 (Irish Standard Time)" },
    {
        "answers": [
            { "questionId": 1, "correct": false },
            { "questionId": 2, "correct": false },
            { "questionId": 3, "correct": false }
        ]
    },
    { "questionNo": 3 },
    { "userName": "" }]

exports.answer1 = {
    content: "Answer no 1 1",
    result: true,
    questionId: 1
}
exports.answer2 = {
    content: "Answer no 2 1",
    result: false,
    questionId: 1
}
exports.answer3 = {
    content: "Answer no 3 1",
    result: false,
    questionId: 1
}
exports.answer4 = {
    content: "Answer no 1 2",
    result: false,
    questionId: 2
}
exports.answer5 = {
    content: "Answer no 2 2",
    result: true,
    questionId: 2
}
exports.answer6 = {
    content: "Answer no 2 3",
    result: false,
    questionId: 2
}
exports.answer7 = {
    content: "Answer no 1 3",
    result: false,
    questionId: 3
}
exports.answer8 = {
    content: "Answer no 2 3",
    result: false,
    questionId: 3
}
exports.answer9 = {
    content: "Answer no 3 3",
    result: true,
    questionId: 3
}
exports.answer10 = {
    content: "Answer no 1 4",
    result: true,
    questionId: 4
}
exports.answer11 = {
    content: "Answer no 2 4",
    result: false,
    questionId: 4
}
exports.answer12 = {
    content: "Answer no 3 4",
    result: true,
    questionId: 4
}

exports.question1 = {
    title: "Question title 1",
    body: "This is a question",
    quizId: 1
}
exports.question2 = {
    title: "Question title 2",
    body: "This is a question",
    quizId: 1
}
exports.question3 = {
    title: "Question title 2",
    body: "This is a question",
    quizId: 1
}
exports.question4 = {
    title: "Question title 4",
    body: "This is a question",
    quizId: 2
}

exports.user1 = {
    name: 'Michal Smigiel',
    email: 'ms@gmail.com',
    master: true,
    password: "123"
};

exports.user3 = {
    name: 'Michal Smigiel',
    email: 'michals@gmail.com',
    master: true,
    password: "123"
};

exports.user2 = {
    name: 'Michal Smigiel',
    email: 'michals@gmail.com',
    master: true,
    password: "123"
};

exports.quiz1 = {
    name: "First quiz",
    category: "Quiz category",
    duration: 90,
    authorId: 1,
    active: false,
    level: "pro"
};
exports.quiz4 = {
    name: "First quiz",
    category: "Quiz category",
    duration: 90,
    authorId: 1,
    active: false,
    level: "pro"
};
exports.quiz2 = {
    name: "Java quiz",
    category: "Quiz category",
    duration: 90,
    authorId: 1,
    active: true,
    level: "pro"
};

exports.quiz3 = {
    name: "NOde quiz",
    category: "Quiz category",
    duration: 90,
    authorId: 2,
    active: true,
    level: "pro"
};
module.exports;
