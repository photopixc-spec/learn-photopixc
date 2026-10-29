'use strict';
function legacySchoolRoute(hash){
 const m=hash.match(/^#(?:g-)?lesson-(\d+)$/);
 if(m&&+m[1]>=1&&+m[1]<=102)return '/google-ads/#g-lesson-'+Number(m[1]);
 if(/^#(?:home|syllabus|skills|studio|labs|analytics|portfolio|review|revision|resources|cheats|cheat-\d+|ai-marketing|ai-tools|ai-cheats|ai-proof|ai-module-\d+)$/.test(hash))return '/google-ads/'+hash;
 return null;
}
const legacyTarget=legacySchoolRoute(location.hash);if(legacyTarget)location.replace(legacyTarget);
window.addEventListener('hashchange',()=>{const target=legacySchoolRoute(location.hash);if(target)location.replace(target);});
if('serviceWorker' in navigator&&window.isSecureContext)navigator.serviceWorker.getRegistration('/').then(r=>{if(r&&r.scope===location.origin+'/')return r.update();}).catch(()=>{});
