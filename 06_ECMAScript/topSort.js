class Vorrang{
   
    constructor(activity){
        this.activity=activity;
 
    }
    *[Symbol.iterator](){
     /* Erstelle eine Map, um festzustellen, wie viele Elemente 
     von jedem Element abhängen*/
     const dependencies=new Map();
     for(const[item,dependency] of this.activity){
         if(!dependencies.has(item)){
             dependencies.set(item,0);
         }
         if(!dependencies.has(dependency)){
             dependencies.set(dependency,0);
         }
         dependencies.set(dependency,dependencies.get(dependency)+1);
     }
     /* Erstelle eine Queue mit allen Elementen, von denen keine anderen 
     Elemente abhängen*/
     const queue=[...dependencies.keys()].filter(item =>
     dependencies.get(item)===0);
 
     // Erstelle eine sortierte Liste
     const sorted=[];
 
     /* Iteriere über die Queue und verarbeite jedes Element, indem du 
     es von der Queue entfernst und die Anzahl der Elemente reduzierst, 
     die von seiner Abhängigkeit abhängen*/
 
     while(queue.length>0){
         const item=queue.shift();
         dependencies.delete(item);
         sorted.push(item);
 
         for(const[otherItem,dependency] of this.activity){
             if(otherItem===item){
                 dependencies.set(dependency,dependencies.get(dependency)-1)
 
                 if(dependencies.get(dependency)===0){
                     queue.push(dependency);
                 }
             }
         }
     }
 
     if (dependencies.size > 0) {
       throw new Error('Cyclic dependency detected');
     }
 
     for (const item of sorted) {
       yield item;
     }
 
 
    }
    
 } 
 
 
 
 
 
 
 
 
 const studentenleben=new Vorrang([["schlafen", "studieren"],
   ["essen", "studieren"],
   ["studieren", "prüfen"]]);
 
 
 
 console.log(studentenleben);
 for(const next of studentenleben){
     console.log(next);
 }
 
 
 const myEdges=document.getElementById('items');
 const myAddbtn=document.getElementById('btnAdd');
 const mySortbtn=document.getElementById('btnSort');
 let count=5;
 let inputCount=9;
 
 myAddbtn.addEventListener('click',function(){
    let myLi=document.createElement('li');
     let mySpan= document.createElement('span');
    mySpan.textContent='Edge '+count+' : ';
 
     
 
     let myInput1=document.createElement('input');
     myInput1.type='text';
     myInput1.id=`inpt${inputCount++}`;
     let myInput2=document.createElement('input');
     myInput2.type='text';
     myInput2.id=`inpt${inputCount}`;
 
     myLi.appendChild(mySpan);
     myLi.appendChild(myInput1);
     myLi.appendChild(myInput2);
     myEdges.appendChild(myLi);
 
     count++;
     inputCount++;
 })
 
 let values=[];
 const myres=document.getElementById('result');
 const arrayToMatrix = (array, columns) => Array(Math.ceil(array.length / columns)).fill('').reduce((acc, cur, index) => {
    return [...acc, [...array].splice(index * columns, columns)]
  }, [])

 mySortbtn.addEventListener('click',function(){
    for(let i=1;i<inputCount;i++){
        values.push(document.getElementById(`inpt${i}`).value)
    }

    const matrix=arrayToMatrix(values,2);
    const activitie=new Vorrang(matrix);

   
    for(const next of activitie){
        myres.innerHTML+=next+'<br>';
         
     }

 })
 
 

    