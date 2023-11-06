document.addEventListener("DOMContentLoaded", () => {
  //* 햄버거 메뉴 아이콘 (폰트 어썸에서 가져온 것)
  const hamburgerMenuIcon = document.getElementById("hamburgerMenu");
  //* 헤더 부분
  const topAppbar = document.getElementById("topAppbar");
  //* 사용자의 프롬프트
  const inputElement = document.querySelector("#inputAndButton input");
  //* 프롬프트의 버튼
  const buttonElement = document.querySelector("#inputAndButton button");
  //* 채팅입력시 채팅이 나타나는 부분
  const chatHistory = document.getElementById("chatHistory");
  //*옆의 사이드 바
  const rightBar = document.getElementById("rightBar");
  //* 프롬프트와 버튼이 같이 있는 div 그 자체
  const inputAndButton = document.getElementById("inputAndButton");

  //햄버거 버튼 구성을 위한 요소들
  //* 메뉴 버튼 생성
  const menuButton = document.createElement("button");
  //* 메뉴가 나오는 요소를 감싸주는 컨테이너 + 클래스 네임 부여
  const menuContainer = document.createElement("div");
  menuContainer.className = "menu-container";
  //* 메뉴 리스트 + 클래스 부여
  const menuList = document.createElement("ul");
  menuList.className = "menu-list";

  // 햄버거 메뉴 토글 기능
  //* 처음에는 접어놓는다.
  let isMenuOpen = false;

  // 햄버거 메뉴 클릭 이벤트 처리
  hamburgerMenuIcon.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    //* 토글 메뉴 상태에 따라 메뉴를 표시 또는 숨긴다.
    if (isMenuOpen) {
      //* 메뉴를 열 때
      //* 메뉴 버튼을 블락한다.
      menuButton.style.display = "block";
      //* test.json을 가져옴
      fetch("test.json")
        .then((response) => response.json())
        .then((data) => {
          // 메뉴 항목 생성 및 추가
          data.header.hamburgerMenu.forEach((menuItem) => {
            //* li태그 생성 text는 메뉴 아이템 메뉴 리스트에 li를 생성한다.
            const li = document.createElement("li");
            li.textContent = menuItem;
            menuList.appendChild(li);
          });
        })
        .catch((error) => {
          //* 서버 에러시 오류 메세지 도출
          console.error("Failed to load menu items:", error);
        });
      // * 메뉴리스트를 메뉴컨테이너의 자식으로 생성하고 메뉴 컨테이너는 헤더에 생성
      menuContainer.appendChild(menuList);
      topAppbar.appendChild(menuContainer);
    } else {
      // 메뉴를 닫을 때
      //* 메뉴버튼 보이지 않게 처리한다.
      //* innerHTML을 빈칸으로 둔다.
      menuButton.style.display = "none";
      menuContainer.innerHTML = "";
    }
  });

  // 메시지 추가 함수
  //* div 생성
  function appendMessage(type, message, timestamp) {
    const messageElement = document.createElement("div");
    //* 클래스 네임 추가
    messageElement.classList.add(type);
    //* 메시지와 시간을 표시한다.
    messageElement.innerText = `${message} (${timestamp})`;
    chatHistory.appendChild(messageElement);
  }

  // 사용자 정보 표시
  const userInfo = {
    name: "John Doe",
    status: "Online",
    avatar: "👤",
  };
  //* json파일을 불러 오는 법
  fetch("test.json") // JSON 파일의 경로를 설정합니다.
    .then((response) => response.json())
    .then((data) => {
      // JSON에서 로고 정보 가져오기
      //* header에서 로고를 가져온다.
      const logo = data.header.logo;

      // 로고를 나타내는 Div 생성
      const logoElement = document.createElement("div");
      topAppbar.appendChild(logoElement);
      logoElement.innerText = logo;

      // 예시 메시지 추가
      const exampleMessages = data.mainContent.inputRecords;

      //* json 파일에서 예시 메세지를 동적으로 가져옴

      exampleMessages.forEach((message) => {
        appendMessage(message.type, message.message, message.timestamp);
      });
    })
    .catch((error) => {
      console.error("Failed to load JSON file:", error);
    });

  //* div 생성 inputandbutton 자식요소로 생성
  const makediv = document.createElement("div");
  inputAndButton.appendChild(makediv);

  //* 위에서 선언한 유저 인포를 가져옴
  makediv.innerHTML = `
    <div class="user-info">
      <div class="avatar">${userInfo.avatar}</div>
      <div class="name">${userInfo.name}</div>
      <div class="status">${userInfo.status}</div>
    </div>
  `;

  // 메시지 전송 버튼 클릭 시
  //* 버튼을 클릭 해야만 전송이 됨
  buttonElement.addEventListener("click", () => {
    //* 인풋에 입력한 값
    const userMessage = inputElement.value;
    if (userMessage) {
      //* 시간을 나타내는 메서드
      const timestamp = new Date().toLocaleTimeString();
      appendMessage("user", userMessage, timestamp);
      inputElement.value = ""; // 입력 필드 비우기

      // 서버로 메시지 전송 및 서버 응답 처리
      // 서버로의 POST 요청 및 데이터 저장 (JSON 파일) 로직 추가
      // *  서버로부터 응답을 받아와서 오른쪽 입력 기록창에 추가 (GET 요청) 로직 추가
      function fetchChatHistory() {
        fetch("/message")
          .then((response) => {
            //* response.ok를 사용하면 HTTP 요청이 성공인지 또는 실패인지 쉽게 판단이 가능하다
            if (response.ok) {
              return response.json(); // JSON 응답을 파싱
            } else {
              throw new Error("Failed to fetch chat history");
            }
          })
          .then((data) => {
            // 가져온 데이터를 처리하고 오른쪽 바에 표시
            const chatRecords = data.mainContent.inputRecords;

            // 오른쪽 바를 초기화하고 채팅 기록을 표시
            rightBar.innerHTML = "";
            chatRecords.forEach((record) => {
              const messageElement = document.createElement("div");
              messageElement.classList.add(record.type);
              messageElement.innerText = `${record.message} `;
              rightBar.appendChild(messageElement);
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      // 초기화: 페이지가 로드될 때 채팅 기록을 가져옴
      fetchChatHistory();
    }
  });
});
