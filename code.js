var app = new Vue ( { 
    el: "#app", 
    data:{
        page:"blog",
        drawer:false,
        selected_category:"all",
        categories:[
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc.",
        ],
        posts:[
        
        ],
        new_title:"",
        new_author:"",
        new_text:"",
        new_image:"",
        new_category:"all",
        server_url:"https://collector-blog.herokuapp.com"
    }, 
    created:function(){
        this.getPosts();
    },
    methods:{
        getPosts:function(){
            fetch(this.server_url+"/posts").then(function(res){
                res.json().then(function(data){
                    console.log(data);
                    app.posts= data.posts;
                })
            });
        },
        submit:function(){
    
            var new_post={
                title:this.new_title,
                author:this.new_author,
                category:this.new_category,
                date:new Date(),
                image:this.new_image,
                text:this.new_text,
            };
            fetch(this.server_url+"/posts",{
                method: "POST",
				headers: {
					"Content-type": "application/json"
                },
                body:JSON.stringify(new_post)
            }).then(function() {
                this.posts.unshift(new_post);
                this.new_title="";
                this.new_author="";
                this.category="all";
                this.new_image="";
                this.new_text="";
                this.page="blog";

            });
        }
    },
    computed:{
        sorted_posts:function(){
            if(this.selected_category == "all"){
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter(function(post){
                    return post.category == app.selected_category;
                });
                return sorted_posts;
            }
        }
    }
});