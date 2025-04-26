//Đây là cách thức để chặn người dùng spam nút bấm liên tục


// Lần chạy đầu tiên của web
useEffect(() => {
    //tạo biến ev rồi gán nó là 1 mouseEvent

    //Hàm này để tạo 1 đối tượng listener, chỉ được chạy 1 lần gán cho toàn bộ các nút trên components
    const listener = function (ev: MouseEvent) {
      //Ép kiểu của ev.target.Đây là kĩ thuật sử dụng để chỉ định rõ ràng kiểu dữ liệu của một đối tượng
      //Sau khi ép kiểu, bạn có thể an toàn truy cập các thuộc tính và phương thức của HTMLButtonElement mà không gặp lỗi từ TypeScript.
      const button = ev.target as HTMLButtonElement;
      if (button.tagName === "BUTTON" && !button.disabled) {
        const clickable = button.dataset.clickable;
        if (clickable === "false") {
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
        button.dataset.clickable = "false";
        button.style.pointerEvents = "none";
        setTimeout(() => {
          button.dataset.clickable = "true";
          button.style.pointerEvents = "";
        }, 300);
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
}, []);