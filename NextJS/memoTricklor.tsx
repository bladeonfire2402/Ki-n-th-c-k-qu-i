//Hàm này sử dụng đến hook useMemo, và hook usePathName
//Mục đích là để trách rerender, chỉ render lại nào khi cần thiết, dependencies ở đây là pathname

const Layout = useMemo(() => {
    //Trường hợp route là ko có
    if (["/_error"].includes(pathname)) {
      return Fragment;
    }
    //Trường hợp route là blog
    if (!["/"].includes(pathname)) {
      return LayoutBlogs;
    }
    //Trường hợp route là port
    if (["/"].includes(pathname)) {
      return LayoutHome;
    }

    //TRả về 1 UI component
    return Fragment;
  }, [pathname]);