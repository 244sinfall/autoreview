
let profile = localStorage.getItem("profile");
let discord = localStorage.getItem("discord");
if(profile) document.getElementById("profile-link").value = profile;
if(discord) document.getElementById("discord-link").value = discord;


document.getElementById("review-block").addEventListener("change", (e) => {
  switch (e.target.id) {
    case "profile-link":
      localStorage.setItem("profile", e.target.value);
      break;
    case "discord-link":
      localStorage.setItem("discord", e.target.value);
      break;
    default:
      break;
  }
})