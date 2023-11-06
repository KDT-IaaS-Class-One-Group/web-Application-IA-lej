document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenuIcon = document.getElementById("hamburgerMenu");
  const topAppbar = document.getElementById("topAppbar");
  const inputElement = document.querySelector("#inputAndButton input");
  const buttonElement = document.querySelector("#inputAndButton button");
  const chatHistory = document.getElementById("chatHistory");
  const rightBar = document.getElementById("rightBar");
  const inputAndButton = document.getElementById("inputAndButton");

  //햄버거 버튼 구성을 위한 요소들
  const menuButton = document.createElement("button");
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";
  const menuList = document.createElement("ul");
  menuList.className = "menu-list";

  // 햄버거 메뉴 토글 기능
  let isMenuOpen = false;

  // 햄버거 메뉴 클릭 이벤트 처리
  hamburgerMenuIcon.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    // 토글 메뉴 상태에 따라 메뉴를 표시 또는 숨깁니다.
    if (isMenuOpen) {
      // 메뉴를 열 때
      topAppbar.style.display = "block";
      menuButton.style.display = "block";
      fetch("test.json")
      .then((response) => response.json())
      .then((data) => {
        // 메뉴 항목 생성 및 추가
        data.header.hamburgerMenu.forEach((menuItem) => {
          const li = document.createElement("li");
          li.textContent = menuItem;
          menuList.appendChild(li);
        });
      })
      .catch((error) => {
        console.error("Failed to load menu items:", error);
      });

    menuContainer.appendChild(menuList);
    topAppbar.appendChild(menuContainer);
  } else {
    // 메뉴를 닫을 때
    topAppbar.style.display = "none";
    menuButton.style.display = "none";
    menuContainer.innerHTML = "";
  }
});


  // 메시지 추가 함수
  function appendMessage(type, message, timestamp) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(type);
    messageElement.innerText = `${message} (${timestamp})`;
    chatHistory.appendChild(messageElement);
  }

  // 사용자 정보 표시
  const userInfo = {
    name: "John Doe",
    status: "Online",
    avatar: "👤"
  };

  fetch('test.json') // JSON 파일의 경로를 설정합니다.
    .then(response => response.json())
    .then(data => {
      // JSON에서 로고 정보 가져오기
      const logo = data.header.logo;

      // 로고를 나타내는 Div 생성
      const logoElement = document.createElement('div');
      topAppbar.appendChild(logoElement);
      logoElement.innerText = logo;

      // 예시 메시지 추가
      const exampleMessages = data.mainContent.inputRecords;

      exampleMessages.forEach((message) => {
        appendMessage(message.type, message.message, message.timestamp);
      });
    })
    .catch(error => {
      console.error('Failed to load JSON file:', error);
    });

  const makediv = document.createElement("div");
  inputAndButton.appendChild(makediv);
  makediv.innerHTML = `
    <div class="user-info">
      <div class="avatar">${userInfo.avatar}</div>
      <div class="name">${userInfo.name}</div>
      <div class="status">${userInfo.status}</div>
    </div>
  `;

  // 메시지 전송 버튼 클릭 시
  buttonElement.addEventListener("click", () => {
    const userMessage = inputElement.value;
    if (userMessage) {
      // 서버로 데이터를 전송하고 메시지를 추가하는 로직을 구현해야 합니다.
      // 여기에서는 간단히 메시지만 추가합니다.
      const timestamp = new Date().toLocaleTimeString();
      appendMessage("user", userMessage, timestamp);
      inputElement.value = ""; // 입력 필드 비우기

      // 서버로 메시지 전송 및 서버 응답 처리
      // 서버로의 POST 요청 및 데이터 저장 (JSON 파일) 로직 추가
      // 서버로부터 응답을 받아와서 오른쪽 입력 기록창에 추가 (GET 요청) 로직 추가
    }
  });
});
