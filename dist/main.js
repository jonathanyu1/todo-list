(()=>{"use strict";const e=e=>({getName:()=>e,setName:t=>{e=t},addTask:e=>{},deleteTask:e=>{},getTasks:()=>{},getTask:e=>{},sayHello:()=>console.log("hello project")}),t=()=>{document.getElementById("projectPopupContainer").classList.add("hideContent"),document.getElementById("newProject").classList.remove("hideContent")};console.log("hello"),e("today"),e("week"),(()=>{let n=[];document.querySelector("#newProject").addEventListener("click",(()=>{document.getElementById("projectPopupContainer").classList.remove("hideContent"),document.getElementById("newProject").classList.add("hideContent"),document.getElementById("projectInputName").value=""})),document.querySelector("#projectCancelBtn").addEventListener("click",(()=>{t()})),document.querySelector("#projectAddBtn").addEventListener("click",(()=>{const o=document.querySelector("#projectInputName");console.log(o.value),(t=>{const o=e(t);n.push(o)})(o.value),(e=>{let t=document.getElementById("projectList"),n=document.createElement("li"),o=document.createElement("button");o.classList.add("btnProject"),o.innerHTML=e,n.appendChild(o),t.appendChild(n)})(o.value),console.log(n[0].getName),t()})),document.querySelector(".addTask").addEventListener("click",(()=>{document.getElementById("formContainer").classList.remove("hideContent"),document.getElementById("formPopup").reset()})),document.querySelector("#btnCloseForm").addEventListener("click",(()=>{document.getElementById("formContainer").classList.add("hideContent")}))})()})();