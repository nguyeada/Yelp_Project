document.getElementById('searchFood').addEventListener('click', () => {
  event.preventDefault();
  // retrives the user's requests
  let food = document.getElementById('food');
  let location = document.getElementById('location');

  let data = {
    food: food.value,
    location: location.value,
  }
  console.log(data)

  // new HttpRequest instance 
  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/getList');
  // important to set this for body-parser
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // setup callback function
  xhr.onloadend = function (e) {
    console.log(xhr.responseText);
    let data = JSON.parse(xhr.responseText);
    // console.log("This is data 1 " + data[0].name);
    document.getElementById('results').style.display = 'block'
    for (var x = 0; x < 16; x++) {
      document.getElementById("rn" + x).innerHTML = data[x].name;
      document.getElementById("rl" + x).innerHTML = "<a href=" + data[x].url + ">" + data[x].url + "</a>";
    }
  }
  // all set up!  Send off the HTTP request
  xhr.send(JSON.stringify(data));

});

document.getElementById('results').style.display = 'none'