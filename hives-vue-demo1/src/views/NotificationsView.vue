<template>
    <div>
        <h1>Notifications</h1>
    </div>
    <div class="notification-bar">
        <ul>
            <li :class="activeTab === 'all' ? 'active' : ''" @click="activeTab = 'all'">
                <span>All</span>
            </li>

            <li to="/verified" :class="activeTab === 'verified' ? 'active' : ''" @click="activeTab = 'verified'">
                <span>Verified</span>
            </li>

            <li to="/mentions" :class="activeTab === 'mentions' ? 'active' : ''" @click="activeTab = 'mentions'">
                <span>Mentions</span>
            </li>
        </ul>
    </div>

    <div v-if="activeTab === 'all'">
        <div>
            <div class="notification" v-for="allnotification in allnotifications" :key="allnotification.id" >
                <div class="icon"  >
                    <img :src="allnotification.icon" alt="notification icon">
                </div>
                <div class="content">
                    <div class="title" >
                        <span class="name" style="position: revert ; ">{{ allnotification.name }}</span>
                        <span class="date" style="margin-left:10px;font-size: small;color: rgb(83, 100, 113)">{{ allnotification.date }}.</span>
                        <span class="action" style="display: block ; color: rgb(83, 100, 113)">{{ allnotification.action }}</span>
                    </div>
                    <div class="description" >
                        {{ allnotification.content }}
                    </div>
                </div>
            </div>
        </div>


    </div>
    <div v-if="activeTab === 'verified'">
        <div>
            <div class="notification" v-for="verifiednotification in verifiednotification" :key="verifiednotification.id" >
                <div class="icon"  >
                    <img :src="verifiednotification.icon" alt="notification icon">
                </div>
                <div class="content">
                    <div class="title" >
                        <span class="name" style="position: revert ;">{{ verifiednotification.name }}</span>
                        <span class="date" style="margin-left:10px;font-size: small;color: rgb(83, 100, 113)">{{ verifiednotification.date }}.</span>
                        <span class="action" style="display: block ; color: rgb(83, 100, 113)">{{ verifiednotification.action }}</span>
                    </div>
                    <div class="description" >
                        {{ verifiednotification.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <div v-if="activeTab === 'mentions'">
        <div>
            <div class="notification" v-for="mentionnotifications in mentionnotifications" :key="mentionnotifications.id" >
                <div class="icon"  >
                    <img :src="mentionnotifications.icon" alt="notification icon">
                </div>
                <div class="content">
                    <div class="title" >
                        <span class="name" style="position: revert ;">{{ mentionnotifications.name }}</span>
                        <span class="date" style="margin-left:10px;font-size: small;color: rgb(83, 100, 113)">{{ mentionnotifications.date }}.</span>
                        <span class="action" style="display: block ; color: rgb(83, 100, 113)">{{ mentionnotifications.action }}</span>
                    </div>
                    <div class="description" >
                        {{ mentionnotifications.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script>

export default {
    name: "NotificationsView",
    data() {
        return {
            activeTab: 'all',
            allnotifications: [
                {
                    id: 1,
                    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    name: 'John Doe',
                    action: 'Like your Hives',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    date: '2 hours ago',
                },
                {
                    id: 2,
                    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    name: 'Jane Smith',
                    action: 'Replying to you',
                    content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    date: '5 hours ago',
                }
            ],

            verifiednotification: [

            ],

           mentionnotifications:[
              {
                id: 1,
                icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                name: 'John Doe',
                action: 'Mention you in Hives',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                date: '2 hours ago',
              },
              {
                id: 2,
                icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                name: 'Jane Smith',
                action: 'Mention you in Hives',
                content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                date: '5 hours ago',
             }
          ]
        }
    },

}
</script>


<style scoped>
.notification-bar {
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    height: 43px;
}

.notification-bar ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.notification-bar li {
    width: 33.33%;
    text-align: center;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.2s ease-in-out;
}

.notification-bar li:hover {
    background-color: #f5f8fa;
}

.notification-bar li.active {
    background-color: #ffffff;
    font-weight: bold;
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
    margin-bottom: 20px;
}
.icon img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>
