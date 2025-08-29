const API_URL = "https://api.github.com/users/";

const form = document.querySelector("form");
const searchInput = document.querySelector("input");
const main = document.querySelector("#card-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchInput.value;
  if (value) {
    getUserData(value);
  }
});

const getUserData = async (username) => {
  try {
    const { data } = await axios(API_URL + username);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    errMessage(`<p>Üzgünüz Aradığınız Kullanıcı Bulunamadı</P>`);
  }
};

const createUserCard = (data) => {
  // console.log(data);
  const userBio = data.bio ? data.bio : "";
  const userName = data.name || data.login;
  main.innerHTML = `
     <div class="card">
        <img src="${data.avatar_url}" alt="" />
        <div class="card-title">
          <h2>${userName}</h2>
          <small>${data.login}</small>
        </div>
        <p>
    ${userBio}
        </p>
        <ul>
          <li><i class="fa-solid fa-users"></i><span> ${data.followers} Followers</span></li>
          <li><span> ${data.following} Following</span></li>
          <li><i class="fa-solid fa-bookmark"></i> <span> ${data.public_repos} Repos</span></li>
        </ul>
        <div class="repos">
     
        </div>
      </div>
  
  `;
};

const getRepos = async (username) => {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    const repos = document.querySelector(".repos");
    data.slice(0, 3).forEach((repo) => {
      const linkTag = document.createElement("a");
      linkTag.href = repo.html_url;
      linkTag.target = "_blank";
      linkTag.innerHTML = `<i class="fa-solid fa-book-bookmark"></i> ${repo.name}`;
      repos.append(linkTag);
    });
  } catch (error) {
    errMessage(error.message);
  }
};

const errMessage = (mess) => {
  main.innerHTML = mess;
};
