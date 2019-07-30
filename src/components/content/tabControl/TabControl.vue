<template>
    <div class="tab-control">
        <div v-for="(title,index) in titles" :key="title.id" class="tab-control-item"
             :class="{active:index=== curremtIndex}" @click="itemClick(index)">
            <span >{{title}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
            },
        },
        data() {
            return {
                curremtIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.curremtIndex=index
                this.$emit('tabClick',index)
            }
        },
    }
</script>


<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        z-index: 9;
        background-color: white;
    }

    .tab-control-item {
        flex: 1;
    }

    .tab-control-item span {
        padding: 5px;
    }

    .active {
        color: var(--color-high-text);
    }

    .active span {
        border-bottom: 3px solid var(--color-tint);
    }
</style>
