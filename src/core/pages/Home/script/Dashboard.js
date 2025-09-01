import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import WhatsNew from './../components/WhatsNew';
import AppThumbnail from './../components/AppThumbnail';
import axios from 'axios';
import { GetSystems } from 'src/core/composables/Authenticate';
export default {
	name: 'Index',
	components: {
		WhatsNew,
		AppThumbnail,
	},
	setup() {
		const $q = useQuasar();
		$q.screen.setSizes({ sm: 599, md: 768 });
		const router = useRouter();
		const store = useStore();
		let systemListData = ref([]);
		let systemListValue = ref([]);
		const systemName = ref('');
		const toWhatsNew = (name, link) => {
			systemName.value = name;
			systemListValue.value = link;
		};

		// https://managewp.com/wp-json/wp/v2/posts/
		// https://software.pixel8.ph/wp-json/wp/v2/posts/

		// set default image if no image is found in the link
		const featuredImg = (imgLink) => {
			let sourceImg = imgLink;
			let defaultImg = require('../../../../../public/default-img.png');
			//find image
			var matches = String(sourceImg).match(/<img.*?src="([^"]*)"[^>]*>(?:<\/img>)?/m);
			let result = matches && matches.length && matches[1] ? matches[1] : '';
			if (result === '') {
				let sourceImg = defaultImg;
				return sourceImg;
			}
			return result;
		};

		const systems = () => {
			Object.values(GetSystems.value).forEach((systemData) => {
				systemListData.value.push({
					system_link: systemData.link,
					system_name: systemData.name,
				});
			});
		};
		// display according to the name of the system
		let getWhatsNew = ref([]);
		const displayBySystemName = (systemPosts) => {
			let systemDisplay =
				systemPosts == 'all' ? posts.value : posts.value.filter((x) => x.sourceName == systemPosts);
			getWhatsNew.value = systemDisplay;
		};
		// display all posts from all source links
		const sources = async () => {
			Object.values(GetSystems.value).forEach((source) => {
				getPosts(source.link, source.name);
			});
			getWhatsNew.value = posts.value;
		};

		// get data to display for each post
		let posts = ref([]);
		let allPosts = ref([]);
		const getPosts = (link, identifier) => {
			axios
				.get(link)
				.then((res) => {
					res.data.forEach((system) => {
						let values = {
							sourceName: identifier,
							link: system.guid.rendered,
							date: system.date.slice(0, 10),
							title: system.title.rendered,
							imgLink: featuredImg(system.content.rendered),
							content: system.content.rendered
								// replace regex with special characters
								.replace(/(<([^>]+)>)/gi, '')
								.replace(/&amp;/g, '&')
								.replace(/&#8217;/g, "'")
								.replace(/&nbsp;/g, ' ')
								.replace(/&#8211;/g, '-')
								.replace(/&#8220;/g, '"')
								.replace(/&#8221;/g, '"'),
						};
						posts.value.push(values);
						allPosts.value.push(values);
					});
					limitPost();
				})
				.catch((err) => {
					console.error(err);
				});
		};

		onMounted(() => {
			systems();
			toWhatsNew('all', systemListData.value);
			sources();
		});

		// limit the posts for per display and per other button to 8 items only
		const limitPost = () => {
			posts.value.length !== 8 && posts.value.splice(8, posts.value.length - 8);
		};
		// add 8 posts per load
		const addPosts = () => {
			let get8Posts = allPosts.value.slice(0, 8);
			get8Posts.forEach(function (item) {
				//prevent duplication of a post
				let postIndex = posts.value.findIndex((b) => b.title === item.title && b.imgLink === item.imgLink);
				postIndex === -1 && posts.value.push(item);
			});
			//prevent duplication per load
			get8Posts = allPosts.value.splice(0, 8);
			console.log('allPosts', allPosts.value.length);
		};

		// load all posts
		const onLoad = (index, done) => {
			setTimeout(() => {
				if (allPosts.value.length) {
					addPosts();
				} else {
					done(true);
				}
				done();
			}, 2000);
		};

		return {
			displayBySystemName,
			sources,
			systems,
			toWhatsNew,
			onLoad,
			allPosts,
			getWhatsNew,
			posts,
			systemListValue,
			systemListData,
			systemName,
			GetSystems,
			router,
		};
	},
};
