<template>
    <header>
    </header>
    <main>
        <div class="wrapper">


        </div>
    </main>
    <footer>

    </footer>
</template>
<script>
    export default {
        data() {
            return {
                formData: {
                    "author": "",
                    "text": "",
                    "reaction": null,
                    "parentId": 0,
                },
                comments: [
                    {
                        "id": 1,
                        "author": "Screxy",
                        "text": "Пост пушка! Рад, что нашел тебя!",
                        "reaction": 1,
                        "parentId": 0,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    },
                    {
                        "id": 2,
                        "author": "Nikolya",
                        "text": "Не согласен",
                        "reaction": -1,
                        "parentId": 1,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    },
                    {
                        "id": 3,
                        "author": "Petya",
                        "text": "Пост объективно не очень",
                        "reaction": -1,
                        "parentId": 1,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    },
                    {
                        "id": 4,
                        "author": "Slavaver",
                        "text": "Пост средний, надо переделать",
                        "reaction": 0,
                        "parentId": 0,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    }, {
                        "id": 5,
                        "author": "Misha",
                        "text": "согласен",
                        "reaction": 1,
                        "parentId": 4,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    },
                    {
                        "id": 6,
                        "author": "Olya",
                        "text": "вы правы",
                        "reaction": 1,
                        "parentId": 4,
                        "createdAt": "2023-06-03T12:42:22.398Z"
                    },
                ]
            }
        },
        methods: {
            addComment() {
                this.comments.push({
                    "id": this.comments.length,
                    "author": this.formData.author,
                    "text": this.formData.text,
                    "reaction": this.formData.reaction,
                    "parentId": 0,
                    "createdAt": this.convertDate
                })
                this.formData = {}
            },
        },
        computed: {
            date() {
                return Date.now();
            },
            convertDate() {
                return new Intl.DateTimeFormat("ru", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                }).format(this.date);
            },
        }
    }
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper {
    padding: 20px;

}
</style>