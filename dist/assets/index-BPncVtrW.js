(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const u="http://localhost:3000/tasks";async function b(){const e=await fetch(u);if(e.ok)return await e.json();throw Error(`Coś poszło nie tak. Kod błedu: ${e.status} `)}async function h({title:e,date:t,body:s}){const o=await fetch(u,{method:"post",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({title:e,date:t,body:s})});if(o.ok)return o.json();throw Error(o.status)}async function g(e){const t=await fetch(u+"/"+e,{method:"delete"});if(t.ok)return t.json();throw Error(t.status)}async function x(e){const t=await fetch(u+`?q=${e}`);if(t.ok)return t.json();throw Error(t.status)}async function S({id:e,title:t,date:s,body:o}){const n=await fetch(u+"/"+e,{method:"put",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t,date:s,body:o})});if(n.ok)return n.json();throw Error(n.status)}const p=document.querySelector(".task-list");function f(e,t=!1){const{date:s,title:o,body:n}=e;return t?`
            <div class="task-inside">
                <div class="task-header">
                    <label>
                        <span>Podaj datę</span>
                        <input type="date" class="task-date" value="${s}">
                    </label>

                    <div class="task-actions">
                        <button class="task-delete" title="Usuń zadanie">
                            <i class='bx  bx-trash'  ></i> 
                        </button>
                    </div>
                </div>

                <div class="row">
                    <label>
                        <span>Tytuł</span>
                        <input type="text" class="task-title" value="${o}">
                    </label>
                </div>

                <div class="row">
                    <label>
                        <span>Treść</span>
                        <textarea class="task-body">${n}</textarea>
                    </label>
                </div>

                <div class="task-footer">
                    <button class="button task-edit-save">Zapisz</button>
                    <button class="button task-edit-cancel button-secondary">Anuluj</button>
                </div>
            </div>
        `:`
            <div class="task-inside">
                <div class="task-header">
                    <h3 class="task-date">${s}</h3>

                    <div class="task-actions">
                        <button class="task-edit" title="Edytuj zadanie">
                            <i class='bx  bx-edit'  ></i> 
                        </button>
                        <button class="task-delete" title="Usuń zadanie">
                            <i class='bx  bx-trash'  ></i> 
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="task-title">${o}</div>
                </div>

                <div class="row">
                    <div class="task-body">
                        ${n}
                    </div>
                </div>
            </div>
        `}function v(e,t){const s=document.createElement("article");s.classList.add("task"),s.dataset.id=e.id,s.innerHTML=f(e,t),p.prepend(s),s.animate([{transform:"scale(0)",opacity:0},{transform:"scale(1)",opacity:1}],{duration:400,iterations:1,easing:"ease-in-out"});const o=document.querySelector(".empty-state");p.querySelector(".task")?o.classList.add("hidden"):o.classList.remove("hidden")}function y(e){const t=document.querySelector(".empty-state");p.innerHTML="",e.length===0?t.classList.remove("hidden"):t.classList.add("hidden"),e.forEach(s=>{v(s,!1)})}function L(){const e=document.querySelector(".all"),t=document.createElement("form");t.classList.add("form"),t.innerHTML=`
    	<div class="form-row">
					<label for="todoTitle" class="form-label">Title</label>
					<input
						type="text"
						class="form-control"
						id="todoTitle"
						name="todoTitle"
						autocomplete="off"
						/>
				</div>
				<div class="form-row">
					<label class="form-label" for="todoMessage">Information</label>
					<textarea
						class="form-control form-control-textarea"
						name="todoMessage"
						id="todoMessage"></textarea>
				</div>
				<div class="form-row">
					<label for="todoDate" class="form-label">Date</label>
					<input
						type="date"
						class="form-control"
						id="todoDate"
						name="todoDate"
						value="2025-07-25" />
				</div>
				<div class="form-row form-row-last">
					<button type="submit" class="button form-button">Add</button>
				</div>
    `,e.append(t)}function T(){const e=document.querySelector(".instruction-container");e.querySelector("#btn-understand");const t=e.animate([{transform:"scale(1) rotate(0deg)",opacity:1},{transform:"scale(0) rotate(180deg)",opacity:0}],{duration:400,iterations:1,easing:"ease-in-out"});t.onfinish=s=>{e.remove()}}function q(){const e=document.createElement("div");e.classList.add("instruction-container"),e.innerHTML=`
  <div class="instruction-detail">
    <div class="tittle">
      <h5>This is a simple To-Do app that helps you:</h5>
    
    </div>

    <div class="instruction-spans">
      <div class="instruction-item">
        <i class="bx bx-folder-check bx-flip-horizontal bx-bounce"></i>
        <span class="instruction-span">Add tasks you want to get done</span>
      </div>

      <div class="instruction-item">
        <i class="bx bx-folder-check bx-bounce"></i>
        <span class="instruction-span">Organize your daily goals</span>
      </div>

      <div class="instruction-item">
        <i class="bx bx-folder-check bx-bounce"></i>
        <span class="instruction-span">Mark tasks as completed</span>
      </div>

      <div class="instruction-item">
        <i class="bx bx-folder-check bx-bounce"></i>
        <span class="instruction-span">Delete what you no longer need</span>
      </div>

      <div class="instruction-item">
        <i class="bx bx-folder-check bx-bounce"></i>
        <span class="instruction-span">Stay focused and productive every day</span>
      </div>
    </div> 

    <div class="btn-understand">
      <button id="btn-understand">I got it!</button>
    </div>
   
    </div>
  </div> 
`,e.querySelector("#btn-understand").addEventListener("click",T),document.body.append(e)}function w(e){const t=document.createElement("div");t.classList.add("error-message"),t.innerHTML=`
      <div class="wrapper">
        <div class="icon">
          <i class="bx bx-x-circle"></i>
        </div>
        <h4 class="error">Ooooops!</h4>
        <p>Something Went Wrong ...</p>

        <p class="alert-info">${e}</p>

        <button class="again-btn">Try Again</button>
        <button class="close-btn"><i class='bx bx-x'></i></button>

      </div>
    `;const s=t.querySelector(".close-btn"),o=t.querySelector(".again-btn");s.addEventListener("click",()=>{t.classList.add("closing"),t.addEventListener("animationend",()=>{t.remove()},{once:!0})}),o.addEventListener("click",()=>{t.classList.add("closing"),t.addEventListener("animationend",()=>{t.remove()},{once:!0})}),document.body.append(t)}function E(e,t){let s;return function(...o){s&&clearTimeout(s),s=setTimeout(()=>{t(...o),s=null},e)}}async function M(){const e=await b();y(e)}L();q();M();const d=document.querySelector(".form"),D=E(500,async e=>{const t=await x(k.value);y(t)}),k=document.querySelector("#todoSearch");k.addEventListener("input",D);d.addEventListener("submit",async e=>{e.preventDefault();const t=d.querySelector("#todoTitle").value,s=d.querySelector("#todoDate").value,o=d.querySelector("#todoMessage").value;if(t&&s&&o)try{const n=await h({title:t,date:s,body:o});v(n),d.reset()}catch{console.error(error)}else w("Please fill in all fields and try again.")});document.addEventListener("click",async e=>{const t=e.target.closest(".task-delete");if(t){const a=t.closest(".task"),i=+a.dataset.id;try{await g(i);const r=a.animate([{transform:"scale(1)",opacity:1},{transform:"scale(0.1)",opacity:0}],{duration:300,iterations:1,easing:"ease-in-out"});r.onfinish=()=>{a.remove();const c=document.querySelector(".task-list"),l=document.querySelector(".empty-state");c&&!c.querySelector(".task")&&l?.classList.remove("hidden")}}catch(r){console.error("Błąd przy usuwaniu:",r)}}const s=e.target.closest(".task-edit");if(s){const a=s.closest(".task");a.dataset.id;const i=a.querySelector(".task-date").innerText,r=a.querySelector(".task-title").innerText,c=a.querySelector(".task-body").innerText,l={date:i,title:r,body:c};a.innerHTML=f(l,!0)}if(e.target.closest(".task-edit-save")){const a=e.target.closest(".task"),i=a.dataset.id,r=a.querySelector(".task-date").value,c=a.querySelector(".task-title").value,l=a.querySelector(".task-body").value,m={id:i,date:r,title:c,body:l};await S(m),a.innerHTML=f(m,!1)}if(e.target.closest(".task-edit-cancel")){const a=e.target.closest(".task"),i=+a.dataset.id,c=(await b()).find(l=>l.id===i);a.innerHTML=f(c,!1)}});
