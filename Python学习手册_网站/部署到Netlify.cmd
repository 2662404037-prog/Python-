@echo off
chcp 936 >nul
title 部署 Python 学习手册 到 Netlify
cd /d "%~dp0"
echo.
echo   ================================================
echo     部署到 Netlify（纯静态站，不需要构建）
echo   ================================================
echo.
where node >nul 2>&1
if errorlevel 1 (
  echo   [!] 没找到 Node.js。
  echo.
  echo   两个办法：
  echo     办法一（最简单）：把这个文件夹直接拖到 https://app.netlify.com/drop
  echo     办法二：先去 https://nodejs.org 装 Node.js ^(选 LTS^)，再双击本文件
  echo.
  pause
  exit /b 1
)
echo   第 1 步：登录 Netlify（第一次会打开浏览器让你授权，只需一次）
echo.
call npx --yes netlify-cli@latest login
if errorlevel 1 goto fail
echo.
echo   第 2 步：正式部署到线上
echo.
call npx --yes netlify-cli@latest deploy --prod --dir=.
if errorlevel 1 goto fail
echo.
echo   ================================================
echo     部署完成！上面那行 Deploy URL 就是你的网站地址
echo   ================================================
echo.
echo   接着可以做这两件小事：
echo     1) 改名：https://app.netlify.com 找到这个站点
echo              -^> Site configuration -^> Change site name
echo     2) 把 sitemap.xml 里的 YOUR-SITE 换成你的真实站点名
echo.
echo   以后内容更新了，重新双击本文件即可（会自动覆盖）
echo.
pause
exit /b 0
:fail
echo.
echo   [!] 出错了。常见原因：
echo     - 网络不通或需要代理
echo     - 浏览器登录没完成，重跑一次即可
echo     - 权限不足：把文件夹放到「文档」等普通目录再试
echo.
echo   也可以改用最省事的方式：把整个文件夹拖到 https://app.netlify.com/drop
echo.
pause
