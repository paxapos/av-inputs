var n;(function(n){n["Rear"]="REAR";n["Front"]="FRONT"})(n||(n={}));function t(n){const t=n.getElementsByTagName("video");if(t.length>0){return t[0]}const o=document.createElement("video");o.autoplay=true;o.style.display="none";n.appendChild(o);return o}function o(n){const t=n.getElementsByTagName("canvas");if(t.length){return t[0]}const o=document.createElement("canvas");o.width=parseInt(n.getAttribute("width"));o.height=parseInt(n.getAttribute("height"));n.appendChild(o);return o}function e(t,o=n.Front){if(navigator.mediaDevices.getUserMedia){console.info("la camara");const e=o==n.Front?"user":"environment";navigator.mediaDevices.getUserMedia({audio:false,video:{width:{min:200},height:{min:200},facingMode:e}}).then((n=>{t.srcObject=n})).catch((function(n){console.log("Something went wrong!",n)}))}}export{n as C,o as a,t as c,e as i};
//# sourceMappingURL=p-b8f7b4ac.js.map