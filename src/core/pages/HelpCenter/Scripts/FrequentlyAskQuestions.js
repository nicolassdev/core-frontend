import SearchForm from '../../../components/SearchForm';
import Navigation from '../components/Navigation';
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue';
export default {
	name: 'Faq',
	components: {
		SearchForm,
		Navigation,
	},
	setup() {
		const $q = useQuasar();
		let popularQuestions = ref([
			{
				id: 1,
				title: 'Change password',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 2,
				title: 'How to change Notification Preferences?',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
		]);
		let featuredQuestions = ref([
			{
				id: 1,
				title: 'Change password',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 2,
				title: 'How to change Notification Preferences?',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 3,
				title: 'Change password',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 4,
				title: 'How to change Notification Preferences?',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 5,
				title: 'Change password',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 6,
				title: 'How to change Notification Preferences?',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 7,
				title: 'Change password',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
			{
				id: 8,
				title: 'How to change Notification Preferences?',
				description:
					'The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows. The product key is located inside the product packaging on the receipt or confirmation page for a digital purchase or in a confirmation email that shows you purchased Windows',
			},
		]);

		return {
			popularQuestions,
			featuredQuestions,
		};
	},
	data() {
		return {
			// Determine if item is hovered/clicked or not
			hovered: false,
			// Storage of previous clicked items
			clickedItem: [],
		};
	},
	methods: {
		/**
		 * Identifies what event to use depending
		 * on the device
		 */
		toggleQuestion(name, event) {
			if (this.$q.screen.width > 1280) {
				if (event !== 'click') {
					this.toogle(name);
				}
			} else if (event == 'click' && this.$q.screen.width <= 1280) {
				this.toogle(name);
			}
		},
		toogle(name) {
			this.hovered = !this.hovered;
			if (this.$q.screen.width < 1024) {
				// Collect previous clicked item/question
				this.clickedItem.push(name);
				if (this.clickedItem.length) {
					!this.hovered && this.clickedItem[this.clickedItem.length - 2] !== name && (this.hovered = true);
				}
			}
			// Display question description except from selected reference
			Object.keys(this.$refs).forEach((r) => {
				name !== r && (this.$refs[r].style.display = 'none');
				name === r && (this.$refs[r].style.display = this.hovered ? 'block' : 'none');
			});

			/**
			 * If description box overflows from the bottom of the page
			 * adjust its display and make it whole visible.
			 */
			if (this.$q.screen.width >= 1024) {
				let bounding = this.$refs[name].getBoundingClientRect();
				if (this.$q.screen.height - bounding.bottom < 130) {
					this.$refs[name].firstElementChild.classList.add('absolute-bottom');
				} else {
					this.$refs[name].firstElementChild.classList.remove('absolute-bottom');
				}
			}
		},
	},
};
