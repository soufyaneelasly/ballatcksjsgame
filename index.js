const canvas = document.
    querySelector('canvas')

const c=canvas.getContext('2d')




canvas.width=innerWidth
canvas.height=innerHeight


const Scoreel=document.querySelector('#Scoreel')
const startgamebtb =document.querySelector('#startgamebtb')
const allstart =document.querySelector('#allstart')
const bigscore=document.querySelector('#bigscore')


 

class Player{
    constructor(x,y,radius,color){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
        
    }
}



class Projectile{
    constructor(x,y,radius,color,velocity){

        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity

    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
        
    }
    update(){
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y


    }



}
class Enemy{
    constructor(x,y,radius,color,velocity){

        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity

    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.fillStyle=this.color
        c.fill()
        
    }
    update(){
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y


    }



}



 
const x = canvas.width/2
const y = canvas.height/2 
let player=new Player (x,y,15,'white')
let projectiles =[]
let enimes =[]
let xx=[]
function init(){
score=0
Scoreel.innerHTML=score
  player=new Player (x,y,15,'white')
  const projectiles =[]
  enimes =[]
  xx=[]
}

let animationid
let score=0
function animate(){
    animationid=requestAnimationFrame(animate)
    c.fillStyle='rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.draw()
    projectiles.forEach((projectile,index)=>{
        projectile.update()
        if (projectile.x + projectile.radius<0 ||
            projectile.x -projectile.radius>canvas.width  ||
            projectile.y + projectile.radius <0||
            projectile.y - projectile.radius>canvas.height){
            setTimeout(()=>{
                   projectiles.splice(index,1)
                
                    

            },0)}})
   

    
      enimes.forEach((xx,index)=>{
        xx.update()
        const dista =Math.hypot(player.x-xx.x,player.y-xx.y)
             if ((dista - xx.radius - player.radius)<1){
                 
                cancelAnimationFrame(animationid)
                bigscore.innerHTML=score

                allstart.style.display='flex'

            }    

      

        projectiles.forEach((projectile,indx)=>{
            const dist =Math.hypot(projectile.x-xx.x,projectile.y-xx.y)
            
            if ((dist - xx.radius - projectile.radius)<1){
                if (xx.radius-10>6){
                    score=score+100
                    Scoreel.innerHTML=score
    

                    gsap.to(xx,{
                        radius:xx.radius-10
                    })
                    setTimeout(()=>{
                        
        
                            projectiles.splice(indx,1)
                            
                           
        
                    },0)
           
                }else{
            setTimeout(()=>{
                {

                    projectiles.splice(indx,1)
                    enimes.splice(index,1)
                    score=score+240
                    Scoreel.innerHTML=score
    
                    }
                   

            },0)
        }}}
            
        )
      }
      )}


function spqwnenemies(){
    
    setInterval(()=>{
         const radius =Math.random()*26+6
         let x 
         let y 
        if (Math.random<0.5){
            y=math.random()*canvas.height
            x=Mah.random()<0.5 ? 0-radius:canvas.width +radius
        }else{
            y=Math.random()<0.5 ? 0-radius:canvas.height+radius
            x=Math.random()*canvas.width
        }
        
           const color =`hsl(${Math.random()*360},50%,50%)`
           const angel=Math.atan2(-y+canvas.height/2,-x+canvas.width/2)     


const velocity ={
    x:Math.cos(angel),
    y:Math.sin(angel)

}
    
    enimes.push(new Enemy(x,y,radius,color,velocity
        ))
     } ,1000)

}




addEventListener('click',(event)=> 
{

const angel=Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)     


const velocity ={
    x:Math.cos(angel)*5,
    y:Math.sin(angel)*5

}
 projectiles.push(
    new Projectile(canvas.width/2,canvas.height/2,5,'white',velocity)


 )

}
 
)
startgamebtb.addEventListener('click',()=>{
init()
animate()
spqwnenemies()
allstart.style.display='none'

})

 