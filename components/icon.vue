<template>
    <div class="icon">
        <span class="text-xs rounded-full">{{title}}</span>
        <a v-if="type && type=='btn'" @click="callback" class="cursor-pointer"><i :class="`${icon} fa-2x z-20`"></i></a>
        <a v-else :href="url" target="_blank"><i :class="`${icon} fa-2x z-20`"></i></a>
    </div>
</template>

<script>
export default {
    name:'icon',
    props:["icon","title","url","type","callback"],
    methods:{

    }
}
</script>