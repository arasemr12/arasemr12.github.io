<template>
    <div ref="nav" @mousedown="down" class="fixed w-full flex items-center justify-center z-40 cursor-move top-5">
        <div class="w-full lg:w-2/3 bg-gray-700 bg-opacity-50 backdrop-blur-sm rounded-full py-4 px-4 flex flex-row items-center justify-center gap-10">
        <a href="#home"><i class="py-2 px-2 bg-gray-800 rounded-full fa-solid fa-house-user"></i></a>
        <a href="#posts"><i class="py-2 px-2 bg-gray-800 rounded-full fa-solid fa-blog"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name:'navbar',
    data:() => {
        return{
            pos1:0,
            pos2:0,
            pos3:0,
            pos4:0
        }
    },
    methods:{
        down(e){
            e.preventDefault();

            this.pos3 = e.clientX;
            this.pos4 = e.clientY;

            document.onmouseup = this.closeDragElement;
            document.onmousemove = this.move;
        },
        move(e){
            let el = this.$refs.nav;

            e.preventDefault();

            this.pos1 = this.pos3 - e.clientX;
            this.pos2 = this.pos4 - e.clientY;
            this.pos3 = e.clientX;
            this.pos4 = e.clientY;
            
            el.style.top = (el.offsetTop - this.pos2) + "px";
            el.style.left = (el.offsetLeft - this.pos1) + "px";
        },

        closeDragElement(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
</script>
