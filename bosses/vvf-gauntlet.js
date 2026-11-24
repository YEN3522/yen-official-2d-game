/* VVF // THREE-BOSS KISHIN GAUNTLET — OG VERSION CONTENT */
window.YEN_BOSSES = window.YEN_BOSSES || {};
const VVF_MAX = 1e33;
const VVF = {
  vaelor: {
    id:"vvf-vaelor", name:"VAELOR", title:"WARDEN OF THE RED MANTLE", stars:5000000,
    maxHP:5000000, shield:0, playerMaxHP:180000, reward:0, kishinCost:"5000000000000",
    idle:"assets/Vaelor.png", fight:"assets/Vaelor.png", cardImage:"assets/Vaelor.png",
    battleTitle:"THE IRON WALL // VVF GAUNTLET", battleClass:"vvf-vaelor-battle",
    battleBackground:"VVF.gif", intro:["FIVE LAYERS OF ANCIENT STEEL LOCK INTO PLACE.","THE GROUND FRACTURES BENEATH HIS BOOTS.","VAELOR DOES NOT MOVE."],
    readyMessage:"THE IRON WALL STANDS BEFORE YOU. BREAK EVERY PLATE.",
    playerAttacks:[["SOUL SLASH",12000,24000,["Your strike rings against the red mantle."]],["HEAVY BREAKER",18000,32000,["The armor shudders under the impact."]],["FINAL CUT",25000,45000,["A hard blow lands against the iron wall."]]],
    bossAttacks:[["MANTLE IMPACT",18000,26000],["IRONCLAD CRUSH",22000,32000],["RED MANTLE SURGE",26000,36000]],
    hooks:{
      createState(){return {plates:5,plateHP:1000000};},
      modifyIncomingDamage(ctx,damage){const s=ctx.state;if(s.plates>0){const dealt=Math.min(s.plateHP,damage);s.plateHP-=dealt;if(s.plateHP<=0){s.plates--;s.plateHP=1000000;if(s.plates===0)s.plateHP=0;ctx.setMessage(`IRONCLAD PLATE SHATTERED // ${s.plates} PLATES REMAIN. VAELOR'S DAMAGE RISES.`);ctx.setStatus(`${s.plates} IRONCLAD PLATES REMAIN`);ctx.state.vaelorDamageBonus=1+(5-s.plates)*.35;}return 0;}return damage;},
      async onStart(ctx){ctx.setStatus("5 IRONCLAD PLATES // 1,000,000 HP EACH");},
      async bossTurn(ctx){const s=ctx.state;const base=ctx.randomInt(18000,30000);const d=Math.round(base*(s.vaelorDamageBonus||1));const v=document.createElement('div');v.className='vvf-impact vvf-iron-impact';document.body.appendChild(v);ctx.setMessage(`VAELOR // IRON WALL IMPACT. ${ctx.fmt(d)} DAMAGE.`);await ctx.wait(450);ctx.shake();ctx.damagePlayer(d);ctx.updateHP();await ctx.wait(500);v.remove();if(ctx.playerHP<=0)ctx.lose();}
    }
  },
  draven:{
    id:"vvf-draven",name:"DRAVEN ALUCARD",title:"THE CRIMSON INQUISITOR",stars:750000000,
    maxHP:750000000,shield:0,playerMaxHP:180000,reward:0,kishinCost:"750000000000000",
    idle:"assets/Draven Alucard.png",fight:"assets/Draven Alucard.png",cardImage:"assets/Draven Alucard.png",
    battleTitle:"THE MARATHON NIGHTMARE // VVF GAUNTLET",battleClass:"vvf-draven-battle",battleBackground:"VVF.gif",
    intro:["THE BLOOD-SEALED BARRIERS RISE.","DRAVEN SMILES AS THE ARENA TURNS CRIMSON.","AN ENDLESS FEAST BEGINS."],
    readyMessage:"THE CRIMSON INQUISITOR IS READY TO DRAIN YOUR SOUL.",
    playerAttacks:[["SOUL SLASH",12000,24000,["Your strike cuts through the crimson haze."]],["HEAVY BREAKER",18000,32000,["The barrier ripples."]],["FINAL CUT",25000,45000,["A heavy blow lands."]]],
    bossAttacks:[["CRIMSON EXECUTION",26000,36000],["BLOOD LANCE",30000,42000],["INQUISITOR'S VERDICT",34000,48000]],
    hooks:{
      createState(){return {barriers:3,barrierHP:50000000,turns:0,hemorrhage:false,sealed:new Set()};},
      modifyIncomingDamage(ctx,damage){const s=ctx.state;if(s.barriers>0){const dealt=Math.min(s.barrierHP,damage);s.barrierHP-=dealt;if(s.barrierHP<=0){s.barriers--;s.barrierHP=s.barriers?50000000:0;ctx.setMessage(`BLOOD BARRIER BROKEN // ${s.barriers} BARRIERS REMAIN. DRAVEN STEALS FIVE ATTACKS.`);ctx.state.turnTheft=5;const stolen=[...document.querySelectorAll("#attack-grid .attack-button:not(:disabled)")].filter(b=>!b.classList.contains("potion-button")).sort(()=>Math.random()-.5).slice(0,5);stolen.forEach(b=>{b.disabled=true;b.classList.add("vvf-taxed");});ctx.setStatus(`${s.barriers} BLOOD BARRIERS REMAIN`);}return 0;}return damage;},
      async onStart(ctx){ctx.setStatus("3 BLOOD-SEALED BARRIERS // 50,000,000 HP EACH");},
      async bossTurn(ctx){const s=ctx.state;const d=ctx.randomInt(26000,42000);const v=document.createElement('div');v.className='vvf-impact vvf-blood-impact';document.body.appendChild(v);ctx.setMessage(`DRAVEN // ENDLESS FEAST. ${ctx.fmt(d)} DAMAGE.`);await ctx.wait(350);ctx.damagePlayer(d);ctx.updateHP();s.hemorrhage=true;await ctx.wait(250);v.remove();if(ctx.playerHP<=0){ctx.lose();return;}const heal=Math.round(d*5);ctx.bossHP=Math.min(ctx.boss.maxHP,ctx.bossHP+heal);ctx.updateHP();ctx.setMessage(`VAMPIRIC OVERHEAL // DRAVEN REGAINS ${ctx.fmt(heal)} HP.`);if(s.hemorrhage){ctx.bossHP=Math.min(ctx.boss.maxHP,ctx.bossHP+15000000);ctx.updateHP();ctx.setMessage("HEMORRHAGE FEAST // DRAVEN REGENERATES 15,000,000 HP.");}s.turns++;if(s.turns%2===0){const buttons=[...document.querySelectorAll('#attack-grid .attack-button:not(:disabled)')].filter(b=>!b.classList.contains('potion-button'));for(const b of buttons.sort(()=>Math.random()-.5).slice(0,3)){b.classList.add('vvf-blood-sealed');b.dataset.vvfSealed='1';}ctx.setMessage("CARD HIJACK // THREE ATTACK CARDS ARE SEALED IN BLOOD CHAINS.");}}
    }
  },
  aurelius:{
    id:"vvf-aurelius",name:"AURELIUS",title:"THE STORM-LOTUS SERAPH",stars:1000000000000,
    maxHP:VVF_MAX,shield:0,playerMaxHP:180000,reward:0,kishinCost:"1000000000000000000",
    idle:"assets/Aurelius.png",fight:"assets/Aurelius.png",cardImage:"assets/Aurelius.png",
    battleTitle:"UNFAIR FINALITY // THE FIVE-STAGE RAID",battleClass:"vvf-aurelius-battle",battleBackground:"VVF.gif",
    intro:["THE SKY SPLITS OPEN.","NINE CELESTIAL LOTUS PETALS ORBIT THE SERAPH.","AURELIUS REWRITES THE RULES OF THE ARENA."],
    readyMessage:"THE STORM-LOTUS SERAPH HAS ENTERED THE FIRST DIVINE STAGE.",
    playerAttacks:[["SOUL SLASH",12000,24000,["Your strike vanishes into the divine storm."]],["HEAVY BREAKER",18000,32000,["The lotus shields tremble."]],["FINAL CUT",25000,45000,["Aurelius barely acknowledges the blow."]]],
    bossAttacks:[["PALE TEMPEST",35000,50000],["DIVINE JUDGMENT",42000,60000],["SERAPHIC STORM",50000,70000]],
    hooks:{
      createState(){return {stage:1,petals:9,petalHP:25000000000,stageMarks:[.8,.6,.4,.2],lastStage:1,attackClicks:0};},
      modifyIncomingDamage(ctx,damage){const s=ctx.state;if(s.stage===5&&damage>=ctx.bossHP-1&&!s.lastStand){s.lastStand=true;ctx.bossHP=1;ctx.setMessage("FALSE DEATH // AURELIUS FREEZES AT 1 HP. JUDGMENT OF THE PALE LOTUS IS COMING.");ctx.updateHP();return 0;}if((s.stage===1||s.stage===3)&&s.petals>0){const d=Math.min(s.petalHP,damage);s.petalHP-=d;if(s.petalHP<=0){s.petals--;s.petalHP=s.petals?25000000000:0;ctx.setMessage(`CELESTIAL LOTUS PETAL DESTROYED // ${s.petals} REMAIN.`);}return 0;}if(s.stage===1&&s.petals===0)return damage*.01;return damage;},
      async onStart(ctx){ctx.setStatus("STAGE 1 // THE GILDED HALO // 9 LOTUS PETALS");const v=document.createElement('div');v.className='vvf-aurelius-halo';document.body.appendChild(v);},
      async afterPlayerHit(ctx){const s=ctx.state;const pct=ctx.bossHP/ctx.boss.maxHP;let stage=pct>.8?1:pct>.6?2:pct>.4?3:pct>.2?4:5;if(stage>s.stage){s.stage=stage;const titles=["","THE GILDED HALO","PALE TEMPEST","SOVEREIGN'S DECREE","DORMANT POWER AWAKENED","NIRVANA APOCALYPSE"];ctx.setPhase(`DIVINE STAGE ${stage} // ${titles[stage]}`);ctx.setStatus(`STAGE ${stage} // ${titles[stage]}`);const v=document.createElement('div');v.className=`vvf-stage-burst vvf-stage-${stage}`;document.body.appendChild(v);ctx.showFlash();ctx.shake();ctx.setMessage(`AURELIUS // ${titles[stage]}. THE ARENA IS REWRITTEN.`);await ctx.wait(650);v.remove();if(stage===3){for(const b of [...document.querySelectorAll('#attack-grid .attack-button')])if(/SLASH|LAST WORD|NO_SAKI/i.test(b.textContent))b.remove();s.petals=4;s.petalHP=25000000000;ctx.setMessage("RULE REWRITE // LOW-TIER ATTACKS ERASED. FOUR LOTUS PETALS REGROW.");}if(stage===4){ctx.boss.playerMaxHP=90000;ctx.playerHP=Math.min(ctx.playerHP,90000);document.querySelectorAll("#attack-grid .potion-button").forEach(b=>b.disabled=true);ctx.setMessage("SOUL CRUSH // MAXIMUM SOUL HP IS CUT TO 90,000. HEALING AND SHIELDS ARE SEALED.");}ctx.updateHP();}},
      async beforePlayerAttack(ctx,attack){const s=ctx.state;s.attackClicks++;if(s.stage===5&&["TRIDENT OF CO-OP","D-E-A-T-H-S-R-I-N-G-E-R","AURALIS & NYXARA"].includes(String(attack.name).toUpperCase()))s.divinitySuppressed=true;if(s.stage===1){const buttons=[...document.querySelectorAll('#attack-grid .attack-button:not(:disabled)')].sort(()=>Math.random()-.5).slice(0,3);buttons.forEach(b=>{b.disabled=true;b.classList.add('vvf-taxed');});}if(s.stage===2&&Number(attack.power||0)>10000000000){const buttons=[...document.querySelectorAll('#attack-grid .attack-button')];buttons.forEach((b,i)=>{if(i%2===0){b.classList.add('vvf-scrambled');b.dataset.vvfOld=b.textContent;b.textContent='??? // DIVINE STATIC';}});setTimeout(()=>buttons.forEach(b=>{if(b.dataset.vvfOld){b.textContent=b.dataset.vvfOld;delete b.dataset.vvfOld;b.classList.remove('vvf-scrambled');}}),2000);}if(s.stage===3&&Math.random()<.3){ctx.setMessage("PARALYZE // THE ATTACK MISSES COMPLETELY.");return true;}if(s.stage===3&&s.petals>0){ctx.setMessage(`LOTUS REGROWTH // ${s.petals} PETALS REMAIN. THE SERAPH IS SHIELDED.`);}return false;},
      async bossTurn(ctx){const s=ctx.state;if(s.stage===5&&s.lastStand&&!s.judgmentUsed){s.judgmentUsed=true;const d=179999;const v=document.createElement("div");v.className="vvf-final-judgment";document.body.appendChild(v);ctx.setMessage("JUDGMENT OF THE PALE LOTUS // 179,999 UNAVOIDABLE DAMAGE.");await ctx.wait(700);ctx.damagePlayer(d);ctx.updateHP();v.remove();if(ctx.playerHP<=0){ctx.lose();return;}return;}const hits=s.stage===4?4:1;for(let i=0;i<hits;i++){if(ctx.playerHP<=0)return;const d=ctx.randomInt(35000,55000);const v=document.createElement('div');v.className='vvf-impact vvf-lightning-impact';document.body.appendChild(v);ctx.setMessage(s.stage===4?`CHAIN LIGHTNING // STRIKE ${i+1}/4. ${ctx.fmt(d)} DAMAGE.`:`AURELIUS // PALE TEMPEST. ${ctx.fmt(d)} DAMAGE.`);await ctx.wait(180);ctx.damagePlayer(d);ctx.updateHP();ctx.shake();v.remove();}if(s.stage===5&&!s.lastStand&&!s.divinitySuppressed){ctx.bossHP=Math.min(ctx.boss.maxHP,ctx.bossHP+25000000000);ctx.setMessage("NIRVANA REGENERATION // AURELIUS RESTORES 25,000,000,000 HP.");ctx.updateHP();}s.divinitySuppressed=false;if(ctx.playerHP<=0)ctx.lose();}
    }
  }
};
Object.values(VVF).forEach(b=>{window.YEN_BOSSES[b.id]=b;});
window.YEN_VVF_GAUNTLET=Object.values(VVF);
