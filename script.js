var list = document.getElementById("list");
var count = document.getElementById("count");

var activities = JSON.parse(localStorage.getItem("ecoActivities")) || [];

// Show activities on page load
function showActivities() {
    list.innerHTML = "";
    activities.forEach(function (activity, index) {
        var item = document.createElement("li");
        item.textContent = activity;

        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.onclick = function () {
            activities.splice(index, 1);
            localStorage.setItem("ecoActivities", JSON.stringify(activities));
            showActivities();
        };

        item.appendChild(deleteBtn);
        list.appendChild(item);
    });

    count.textContent = activities.length;
}

// Add activity function
function addActivity() {
    var activityInput = document.getElementById("activity");
    var activity = activityInput.value.trim();

    if (activity === "") {
        alert("Please enter an activity 🌱");
        return;
    }

    activities.push(activity);
    localStorage.setItem("ecoActivities", JSON.stringify(activities));
    activityInput.value = "";
    showActivities();
}

// Add Enter key support
document.getElementById("activity").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addActivity();
    }
});

showActivities();