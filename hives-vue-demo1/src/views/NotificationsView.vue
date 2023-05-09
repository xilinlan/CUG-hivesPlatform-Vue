<template>
    <h1>Notifiactions</h1>
    <div class="notification-bar">
        <ul>
            <router-link style="text-decoration: none; color: inherit; display: inline-block; width: 300px;" to="/notifications">
                <li :class="activeTab === 'all' ? 'active' : ''" @click="activeTab = 'all'">
                    <span>All</span>
                </li>
            </router-link>

            <router-link style="text-decoration: none; color: inherit; display: inline-block; width: 300px;" to="/verified">
                <li :class="activeTab === 'verified' ? 'active' : ''" @click="activeTab = 'verified'">
                    <span>Verified</span>
                </li>
            </router-link>

            <router-link style="text-decoration: none; color: inherit; display: inline-block; width: 300px;" to="/mentions">
                <li :class="activeTab === 'mentions' ? 'active' : ''" @click="activeTab = 'mentions'">
                    <span>Mentions</span>
                </li>
            </router-link>
        </ul>
    </div>
    <router-view></router-view>

    <router-view  v-if="activeTab === 'all'">

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

    </router-view>

</template>

<script>
import Notification_mentions from "@/components/Notification_mentions.vue";
import Notification_verified from "@/components/Notification_verified.vue";
export default {
    name: "NotificationsView",
    components:{
                Notification_mentions,
                Notification_verified,
    },
    data() {
        return {
            activeTab: 'all',
            notifications: [
                {
                    id: 1,
                    icon: './src/assets/image/doglogo.png',
                    name: 'John Doe',
                    action: 'liked your post',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    date: '2 hours ago',
                    postId: 1234
                },
                {
                    id: 2,
                    icon: './src/assets/image/doglogo.png',
                    name: 'Jane Smith',
                    action: 'commented on your post',
                    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    date: '5 hours ago',
                    postId: 5678
                }
            ]

        }
    }
}
</script>

<style scoped>
.notification-bar {
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    height: 50px;
    border-bottom: 1px solid #dddd;
}

.notification-bar ul {

    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.notification-bar li {
    text-align: center;
    cursor: pointer;
    height: 50px;
    padding: 10px;
    transition: background-color 0.2s ease-in-out;
}

.notification-bar li:hover {
    background-color: #f5f8fa;
}

.notification-bar li.active {
    background-color: #ffffff;
    height: 50px;
    border-bottom: 2px solid #f2d61d;

}



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
