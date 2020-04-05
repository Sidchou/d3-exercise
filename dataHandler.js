
//text
d3.text("test.txt").then((d)=>{
  let t = [];
  let br = [];
  let a = 0;
  // let tVal = "\\t";
  // let tMod = "g";
  // let tRegX = new RegExp(tVal,tMod);
  let tRegX = /\t/g;
  let brVal = "\\b\n\\b";
  let brMod = "g";
  let brRegX = new RegExp(brVal,brMod);
  // let brRegX = /\b\n\b/g;

  d.replace(tRegX,(a,b)=>{t.push(b); return a})
  d.replace(brRegX,(a,b)=>{br.push(b);return a})

console.log(typeof(d));
console.log("data: "+d);
console.log(a);
console.log(t);
console.log(br)

})
