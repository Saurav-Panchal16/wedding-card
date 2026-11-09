var $=function(i){return document.getElementById(i)},D=new Date(C.date);
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches,HAS=!!window.gsap&&!RM;
var names=C.groom+" & "+C.bride,dstr=D.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
["cN","hN","fN"].forEach(function(i){$(i).textContent=names});
$("bN").textContent=C.bride;$("gN").textContent=C.groom;

$("hD").textContent="23 – 25 November 2026";$("fD").textContent="23 – 25 November 2026";
$("rDay").textContent=D.toLocaleDateString("en-GB",{weekday:"long"});$("rDate").textContent=dstr;
$("rTime").textContent="Baraat departs at 6:15 PM";$("rVen").textContent=C.venue;
$("vN").textContent=C.venue;$("vA").textContent=C.address;
$("map").src="https://www.google.com/maps?q="+encodeURIComponent(C.mapQ)+"&output=embed";
$("dir").href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(C.mapQ);$("pin").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.mapQ);
var f=function(d){return d.toISOString().replace(/[-:]|\.\d{3}/g,"")},E=new Date(D.getTime()+5*36e5);
$("gcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(names+" Wedding")+"&dates="+f(D)+"/"+f(E)+"&location="+encodeURIComponent(C.venue);

function split(el){var t=el.textContent;el.setAttribute("aria-label",t);el.textContent="";
t.split(" ").forEach(function(w,i,a){var s=document.createElement("span");s.className="w";s.setAttribute("aria-hidden","true");
w.split("").forEach(function(c){var k=document.createElement("span");k.className="ch";k.textContent=c;s.appendChild(k)});
el.appendChild(s);if(i<a.length-1)el.appendChild(document.createTextNode(" "))});return el.querySelectorAll(".ch")}

// countdown with rolling digits
function setNum(id,v){var e=$(id);if(e.textContent===v)return;var first=!e.dataset.i;e.textContent=v;e.dataset.i=1;
if(HAS&&!first)gsap.fromTo(e,{yPercent:80,opacity:0},{yPercent:0,opacity:1,duration:.6,ease:"power3.out"})}
function tick(){var s=Math.max(0,Math.floor((D-new Date())/1000)),p=function(n){return String(n).padStart(2,"0")};
setNum("cdD",String(Math.floor(s/86400)));setNum("cdH",p(Math.floor(s%86400/3600)));setNum("cdM",p(Math.floor(s%3600/60)));setNum("cdS",p(s%60))}
tick();setInterval(tick,1000);

// ===== Framer Motion islands (gallery lightbox + wishes wall) =====
var h=React.createElement,M=window.Motion,spring={type:"spring",stiffness:260,damping:32};
var IMGS=["assets/img/gallery-1.jpg","assets/img/gallery-2.jpg","assets/img/gallery-3.jpg"];
function Gallery(){var s=React.useState(null),sel=s[0],set=s[1];
return h(React.Fragment,null,
h("div",{className:"gal"},IMGS.map(function(u,i){return h(M.motion.div,{key:i,layoutId:"g"+i,className:"gi",whileHover:{scale:1.02},whileTap:{scale:.98},transition:spring,onClick:function(){set(i)}},h("img",{src:u,alt:"Wedding moment "+(i+1),draggable:false,loading:"lazy"}))})),
h(M.AnimatePresence,null,sel!==null&&h(M.motion.div,{key:"lb",className:"lb",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},onClick:function(){set(null)}},
h(M.motion.div,{layoutId:"g"+sel,className:"lbi",transition:spring},h("img",{src:IMGS[sel],alt:"Wedding moment "+(sel+1),draggable:false})))))}
ReactDOM.createRoot($("galRoot")).render(h(Gallery));

// ===== GSAP choreography =====
var opened=false;
if(HAS){
gsap.registerPlugin(ScrollTrigger);
var cch=split($("cN"));
gsap.set([".cc .eyebrow",".seal"],{opacity:0,y:18});gsap.set(cch,{yPercent:120});
gsap.timeline({delay:.3}).to(cch,{yPercent:0,duration:1.3,stagger:.05,ease:"power4.out"})
.to(".cc .eyebrow",{opacity:1,y:0,duration:1,stagger:.15,ease:"power3.out"},"-=.9").to(".seal",{opacity:1,y:0,duration:1,ease:"power3.out"},"-=1");
var hch=split($("hN")),hin=gsap.utils.toArray(".h-in");
gsap.set(hch,{yPercent:120});gsap.set(hin,{opacity:0,y:24});gsap.set("nav",{yPercent:-110});
$("openBtn").onmouseenter=function(){gsap.to(".seal",{scale:1.07,duration:.5,ease:"power3.out"})};
$("openBtn").onmouseleave=function(){gsap.to(".seal",{scale:1,duration:.5,ease:"power3.out"})};
function heroIn(){var t=gsap.timeline();
t.to(hch,{yPercent:0,duration:1.3,stagger:.05,ease:"power4.out"})
.to(hin,{opacity:1,y:0,duration:1,stagger:.1,ease:"power3.out"},"-=1.0").to("nav",{yPercent:0,duration:1,ease:"power3.out"},"-=1.2")}
$("openBtn").onclick=function(){if(opened)return;opened=true;music(true);document.body.style.overflow="";
gsap.timeline({onComplete:function(){$("cover").style.display="none";ScrollTrigger.refresh()}})
.to(".cc",{opacity:0,scale:.96,duration:.7,ease:"power2.in"})
.to(".door.l",{xPercent:-100,duration:1.7,ease:"expo.inOut"},"-=.1").to(".door.r",{xPercent:100,duration:1.7,ease:"expo.inOut"},"<")
.add(heroIn,"-=1.1")};

// headings: masked character rise
gsap.utils.toArray(".sp").forEach(function(el){var c=split(el);
gsap.from(c,{yPercent:115,duration:1.2,stagger:.025,ease:"power4.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}})});
// generic reveals
gsap.utils.toArray(".rv").forEach(function(el){gsap.from(el,{y:36,opacity:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}})});
gsap.utils.toArray(".cardc .photo").forEach(function(el){gsap.from(el,{clipPath:"inset(100% 0 0 0)",duration:1.5,ease:"expo.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}})});
// timelines: scrubbed line + staggered entries
gsap.utils.toArray(".tl").forEach(function(tl){var ln=document.createElement("i");ln.className="ln";tl.insertBefore(ln,tl.firstChild);
gsap.fromTo(ln,{scaleY:0},{scaleY:1,ease:"none",scrollTrigger:{trigger:tl,start:"top 75%",end:"bottom 75%",scrub:.5}});
tl.querySelectorAll(".ev").forEach(function(ev){gsap.from(ev,{x:-28,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:ev,start:"top 85%",once:true}})})});
// itinerary cards: staggered rise
gsap.utils.toArray(".itin").forEach(function(g){gsap.from(g.querySelectorAll(".ic"),{y:40,opacity:0,duration:1,stagger:.12,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:g,start:"top 88%",once:true}})});
// magnetic buttons (pointer devices only)
if(matchMedia("(hover:hover)").matches)document.querySelectorAll(".btn:not(#dir):not(#pin)").forEach(function(b){
var x=gsap.quickTo(b,"x",{duration:.6,ease:"power3"}),y=gsap.quickTo(b,"y",{duration:.6,ease:"power3"});
b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();x((e.clientX-r.left-r.width/2)*.2);y((e.clientY-r.top-r.height/2)*.3)});
b.addEventListener("mouseleave",function(){x(0);y(0)})});
}else{$("openBtn").onclick=function(){$("cover").style.display="none";document.body.style.overflow="";music(true)};$("done").style.opacity=1}
document.body.style.overflow="hidden";

// ===== scratch card =====
var cv=$("sc"),cx=cv.getContext("2d"),drawing=false,cleared=false;
function setup(){if(cleared)return;var r=cv.parentNode.getBoundingClientRect();cv.width=r.width;cv.height=r.height;
var gr=cx.createLinearGradient(0,0,r.width,r.height);gr.addColorStop(0,"#d9b45f");gr.addColorStop(.5,"#f3dc9a");gr.addColorStop(1,"#a8812f");
cx.fillStyle=gr;cx.fillRect(0,0,r.width,r.height);cx.fillStyle="#6b4f12";cx.font="700 22px 'Playfair Display',serif";cx.textAlign="center";cx.fillText("Scratch Here",r.width/2,r.height/2+8)}
setup();window.addEventListener("load",setup);
function pos(e){var r=cv.getBoundingClientRect(),t=e.touches?e.touches[0]:e;return[t.clientX-r.left,t.clientY-r.top]}
function sc(e){if(!drawing||cleared)return;e.preventDefault();var p=pos(e);cx.globalCompositeOperation="destination-out";cx.beginPath();cx.arc(p[0],p[1],24,0,7);cx.fill();check()}
function check(){var d=cx.getImageData(0,0,cv.width,cv.height).data,n=0;for(var i=3;i<d.length;i+=64)if(d[i]===0)n++;
if(n/(d.length/64)>.45){cleared=true;cv.style.pointerEvents="none";
if(HAS){gsap.to(cv,{opacity:0,duration:1.2,ease:"power2.out"});gsap.from(".reveal>*",{y:18,opacity:0,duration:1,stagger:.12,delay:.2,ease:"power3.out"});gsap.to("#done",{opacity:1,duration:1,delay:.8})}
else{cv.style.opacity=0;$("done").style.opacity=1}}}
["mousedown","touchstart"].forEach(function(t){cv.addEventListener(t,function(e){drawing=true;sc(e)},{passive:false})});
["mousemove","touchmove"].forEach(function(t){cv.addEventListener(t,sc,{passive:false})});
["mouseup","mouseleave","touchend"].forEach(function(t){cv.addEventListener(t,function(){drawing=false})});

// ===== music (generated melody) =====
var ac,playing=false,timer,notes=[523,659,784,659,587,698,880,698,659,784,988,784],ni=0;
function note(){var o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.value=notes[ni++%notes.length];
g.gain.setValueAtTime(0,ac.currentTime);g.gain.linearRampToValueAtTime(.08,ac.currentTime+.05);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+1.4);
o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+1.5)}
var aud=null;
function synthStart(){ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();note();timer=setInterval(note,650)}
function music(on){
 playing=on;$("mus").textContent=on?"♪":"✕";
 if(on){
  // Uses assets/audio/song.mp3 if you add one; otherwise falls back to a soft generated melody.
  aud=aud||new Audio(C.song||"assets/audio/song.mp3");aud.loop=true;aud.volume=.8;
  var r=aud.play();
  if(r&&r.catch)r.catch(function(){if(playing&&!timer)synthStart()});
 }else{if(aud)aud.pause();clearInterval(timer);timer=null}
}
$("mus").onclick=function(){music(!playing)};

