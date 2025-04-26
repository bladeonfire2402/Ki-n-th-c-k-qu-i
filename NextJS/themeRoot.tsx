"use client";

import LayoutHome from "@/components/layout-home";
import AppContext from "@/contexts/app";
import LayoutBlogs from "@/screens/blogs/components/layouts/LayoutBlogs";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useContext, useEffect, useMemo } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

export type ThemeWrapperProps = {
  children: ReactNode;
  theme: DefaultTheme;
};

const ThemeWrapper = ({ children, theme }: ThemeWrapperProps) => {
  const pathname = usePathname(); //Hook để lấy URl
  const { setInitJs } = useContext(AppContext);
  useEffect(() => {
    //tạo biến ev rồi gán nó là 1 mouseEvent
    const listener = function (ev: MouseEvent) {
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

  const Layout = useMemo(() => {
    if (["/_error"].includes(pathname)) {
      return Fragment;
    }
    if (!["/"].includes(pathname)) {
      return LayoutBlogs;
    }
    if (["/"].includes(pathname)) {
      return LayoutHome;
    }

    return Fragment;
  }, [pathname]);

  useEffect(() => {
    // Function to load a script dynamically
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(src);
        script.onerror = () => reject(new Error(`Error loading script: ${src}`));
        document.body.appendChild(script);
      });
    };

    // Load jQuery first
    loadScript("./js/jquery.js")
      .then(() => {
        // After jQuery is loaded, load typekit.js
        return loadScript("./js/typekit.js");
      })
      .then(() => {
        // After typekit.js is loaded, load frame.js
        return loadScript("./js/frame.js");
      })
      .then(() => {
        setInitJs(true);
        // When all scripts are loaded, stop loading
      })
      .catch((error) => {
        console.error({ error });
      });

    // Optional cleanup of scripts when the component unmounts
    return () => {
      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Header /> */}
        <Layout>{children}</Layout>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
