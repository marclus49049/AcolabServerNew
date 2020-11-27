// //post
// let data = {
//     first_name: 'John',
//     last_name: 'Adams',
//     job_title: 'Software Engineer'
//  };
//  const options = {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//  }
//  }
//  fetch('https://reqres.in/api/users', options)
//     .then(res => res.json())
//     .then(res => console.log(res));

//fetch api

function getData(){
    console.log("Started getData")
    url = "https://api.github.com/users";
    fetch(url).then((response)=>{
        console.log("Inside first then")
        return response.json();
    }).then((data)=>{
        console.log("Inside second then")
        console.log(data);
    })
}


function postData(){
    url = "http://dummy.restapiexample.com/api/v1/create";
    data = '{"name":"harglry347485945","salary":"123","age":"23"}'
    params = {
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data //JSON.stringify(data) for object
    }
    fetch(url, params).then(response=> response.json())
    .then(data => console.log(data)
    )
}

// console.log("Before running getData")
// getData()
// console.log("After running getData")
postData();






//async/await
async function vanshaj(){
    console.log('Inside vanshaj function');
    const response = await fetch('https://api.github.com/users');
    console.log('before response');
    const users = await response.json();
    console.log('users resolved')
    return users;

    // return "vanshaj";
}

console.log("Before calling vanshaj")
let a = vanshaj();
console.log("After calling vanshaj")
console.log(a);
a.then(data => console.log(data))
console.log("Last line of this js file")