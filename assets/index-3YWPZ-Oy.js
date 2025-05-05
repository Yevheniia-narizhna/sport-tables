(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function d(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(s){if(s.ep)return;s.ep=!0;const t=d(s);fetch(s.href,t)}})();async function y(){return await(await fetch("https://63ee0ec0388920150dd83e3c.mockapi.io/teams")).json()}function b(o){return{home:o.map(e=>({...e,points:Math.floor(e.points*.6)})),away:o.map(e=>({...e,points:Math.floor(e.points*.4)}))}}let p={general:!1,home:!1,away:!1};const f=async(o,e)=>{const d=await y();let n={};o==="home"||o==="away"?b(d)[o].forEach(c=>{n[c.group]||(n[c.group]=[]),n[c.group].push(c)}):d.forEach(a=>{n[a.group]||(n[a.group]=[]),n[a.group].push(a)}),e.innerHTML="";const s=['<span class="header-full">Игры</span><span class="header-short">И</span>','<span class="header-full">В</span><span class="header-short">В</span>','<span class="header-full">Н</span><span class="header-short">Н</span>','<span class="header-full">П</span><span class="header-short">П</span>','<span class="header-full">З-П</span><span class="header-short">З-П</span>','<span class="header-full">Форма</span>','<span class="header-full">Очки</span><span class="header-short">О</span>'],t={W:`<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9428" />
          </svg>`,D:`<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9401" />
          </svg>`,L:`<svg class="icon-td">
            <use href="/symbol-defs.svg#icon-Frame9425" />
          </svg>`};Object.entries(n).forEach(([a,i])=>{i.sort((r,l)=>l.points-r.points);const c=document.createElement("table");c.classList.add("group-table",`group-${a}`);const h=`<thead>
    <tr class="head-tabl">
      <th class="group-th" colspan="3">ГРУПА ${a}</th>
      ${s.map((r,l)=>`<th class="tabl-${l}">${r}</th>`).join("")}
    </tr>
  </thead>`,u=i.map((r,l)=>{const m=r.form.map(g=>t[g]).join(" ");return`<tr>
        <td class="first-td"> <span class="rank-td ${l+1===1?"first":l+1===2?"second":l+1===3?"third":"last"}">${l+1}<span class="tooltip">Лига чемпионов</span></span></td>
          <td class="logo-td"><img src="${r.logo}" alt="${r.name.charAt(0)}" width="30" /></td>
          <td class="team-name-td">${r.name}</td>
          <td class="games-td">${r.games}</td>
          <td class="wins-td">${r.wins}</td>
          <td class="draws-td">${r.draws}</td>
          <td class="loses-td">${r.loses}</td>
          <td class="score-td">${r.scored}-${r.conceded}</td>
          <td class="form-td">${m}</td>
          <td class="points-td">${r.points}</td>
        </tr>`}).join("");c.innerHTML=h+`<tbody>${u}</tbody>`,e.appendChild(c)}),p[o]=!0};document.addEventListener("DOMContentLoaded",async()=>{document.querySelector('.tab[data-type="general"]').classList.add("active");const e=document.getElementById("general-table");p.general||await f("general",e),e.classList.remove("hidden");const d=document.querySelectorAll(".tab");d.forEach(n=>{n.addEventListener("click",async()=>{d.forEach(a=>a.classList.remove("active")),n.classList.add("active");const s=n.dataset.type,t=document.getElementById(`${s}-table`);p[s]||await f(s,t),document.querySelectorAll(".table-wrapper").forEach(a=>{a.classList.add("hidden")}),t.classList.remove("hidden")})})});
//# sourceMappingURL=index-3YWPZ-Oy.js.map
