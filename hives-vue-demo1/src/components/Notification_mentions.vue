<template>

    <div>
        <div class="notification" v-for="notification in notifications" :key="notification.id" >
            <div class="icon"  >
                <img :src="notification.icon" alt="notification icon">
            </div>


            <div class="content">
                <div class="title" >
                    <span class="name" style="position: revert; font-size: math">{{ notification.name }}</span>
                    <span class="action" style="display: block">{{ notification.action }}</span>
                </div>


                <div class="description">
                    {{ notification.content }}
                </div>

                <div class="date" style="font-size: small">
                    {{ notification.date }}
                </div>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name: "Notification_mentions",
    data() {
        return {
            activeTab: 'all',
            notifications: [
                {
                    id: 1,
                    icon: './src/assets/image/doglogo.png',
                    name: 'John Doe',
                    action: 'Menton your post',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    date: '2 hours ago',
                    postId:
                },
                {
                    id: 2,
                    icon: './src/assets/image/doglogo.png',
                    name: 'Jane Smith',
                    action: 'mention your post',
                    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    date: '5 hours ago',
                    postId:
                }
            ]

        }
    }
}


</script>

<style scoped>
.notification {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
}
.notification:hover{
    background-color: #f5f8fa;
}
.icon {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.title {
    font-weight: normal;
}

</style>