console.log(
  "%c" +
    " __      __  ______   __  __   ______     " +
    "\n" +
    "/\\ \\  __/\\ \\ /\\__  _\\ /\\ \\ /\\ \\ /\\__  _\\    " +
    "\n" +
    "\\ \\ \\/\\ \\ \\ \\/_\\/\\ \\/ \\ \\ \\/'/'\\/ _/\\ \\/    " +
    "\n" +
    " \\ \\ \\ \\ \\ \\ \\ \\ \\ \\  \\ \\ , <    \\ \\ \\    " +
    "\n" +
    "  \\ \\ \\_/ \\_\\ \\ \\_\\ \\__\\ \\ \\\\`\\   \\_\\ \\__ " +
    "\n" +
    "   \\ `\\___x___/ /\\_____\\\\ \\_\\ \\_\\ /\\_____\\ " +
    "\n" +
    "    '/__//__/  /_____/ \\/_/\\/_/ /_____/",
  "color: #d81b60; font-size: 16px; font-weight: bold;"
);


window.onload = function() {
  displaySavedComments();
};

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  
  for(let cookie of cookies) {
      cookie = cookie.trim();
      if(cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
      }
  }
  return null;
}

function saveMultipleComments() {
  const existing = JSON.parse(getCookie('comments') || '[]');
  const newComment = {
      nickname: "방문자",
      comment: document.getElementById('comment').value,
      date: new Date().toISOString()
  };
  existing.push(newComment);
  setCookie('comments', JSON.stringify(existing), 365);
  window.alert("댓글이 등록되었습니다");
  displaySavedComments();
}


function displaySavedComments() {
  const savedData = getCookie('comments');
  const commentList = document.getElementsByClassName('comment-list')[0];
  
  commentList.innerHTML = '';

  if(savedData) {
    const comments = JSON.parse(savedData);
    
    comments.forEach((comment, index) => {
      const commentItem = createCommentElement(comment, index);
      commentList.appendChild(commentItem);
    });
  }
}

function createCommentElement(commentData, index) {
  const li = document.createElement('li');
  li.className = 'comment-item';
  li.dataset.index = index;

  li.innerHTML = `
            <li>
              <div class="comment-item">
                <div class="comment-author">
                  <img src="./media/images/comment-author-icon.png" alt="사용자 프로필 이미지" />
                  <span>${commentData.nickname}</span>
                </div>
                <div class="comment-content">
                ${commentData.comment}
                </div>
              </div>
            </li>
  `;

  return li;
}