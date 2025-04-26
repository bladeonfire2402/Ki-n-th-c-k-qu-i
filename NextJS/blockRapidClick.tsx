//Đây là cách thức để chặn người dùng spam nút bấm liên tục


// Lần chạy đầu tiên của web
useEffect(() => {
    //tạo biến ev rồi gán nó là 1 mouseEvent

    //Hàm này để tạo 1 đối tượng listener, chỉ được chạy 1 lần gán cho toàn bộ các nút trên components
    const listener = function (ev: MouseEvent) {
      //Ép kiểu của ev.target.Đây là kĩ thuật sử dụng để chỉ định rõ ràng kiểu dữ liệu của một đối tượng
      //Sau khi ép kiểu, bạn có thể an toàn truy cập các thuộc tính và phương thức của HTMLButtonElement mà không gặp lỗi từ TypeScript.
      const button = ev.target as HTMLButtonElement;
      //Kiểm tra xem button có tag button không đồng thời button có active không
      if (button.tagName === "BUTTON" && !button.disabled) {
        //dataset tác động đến thuộc tính data-*
        //Thuộc tính data-* là một cách trong HTML để lưu trữ dữ liệu tùy chỉnh cho các phần tử mà không ảnh hưởng đến cách chúng hoạt động
        //data-* đánh dấu xem thẻ đó là gì , dạng gì
        const clickable = button.dataset.clickable;//Tạo 1 biến tượng trưng cho khả năng nút có bấm được hay không
        if (clickable === "false") {
          ev.preventDefault();//Hàm chặn lại tất cả event khác
          ev.stopPropagation();//
          return;
        }

        // Ngay lập tức vô hiệu hóa nút, để tránh spam
        button.dataset.clickable = "false";
        button.style.pointerEvents = "none";

        //Sau 1 thòi gian thì kích hoạt lại nút
        setTimeout(() => {
          button.dataset.clickable = "true";
          button.style.pointerEvents = "";
        }, 300);
      }
    };
    document.addEventListener("click", listener);

    //Hàm cleanunp dọn dẹp đi để trách lãng phí tài nguyên
    return () => {
      document.removeEventListener("click", listener);
    };
}, []);