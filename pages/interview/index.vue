<template>
    <!-- introductory questions modal -->
    <UModal v-model="intro_questions" prevent-close="">
        <UCard>
            <template #header>

                <h2 class="font-bold text-2xl text-left">Welcome to the Interview</h2>
                <p class="text-gray-500 text-left">Please answer the following introductory questions to proceed.</p>

            </template>

            <div class="flex flex-col gap-0">
                <div class=" flex flex-col gap-6" v-if="current_question_slide === 0">
                    <div class="flex flex-col gap-3 p-0">
                        <span class="font-bold">Your Fullname?</span>
                        <UInput v-model="questions.fullname" placeholder="Enter your name" />
                    </div>

                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Nationality {{ questions.nationality }}</span>
                        <USelectMenu searchable searchable-placeholder="Search a country..." class="w-full lg:w-48"
                            placeholder="Select country" v-model="questions.nationality" :options="countryList"
                            value-attribute="name" option-attribute="name" />
                    </div>

                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Country Applying to {{ questions.country_applying_to }}</span>
                        <USelectMenu searchable searchable-placeholder="Search a country..." class="w-full lg:w-48"
                            placeholder="Select country" v-model="questions.country_applying_to" :options="countryList"
                            value-attribute="name" option-attribute="name" />
                    </div>
                </div>

                <div class=" flex flex-col gap-6" v-if="current_question_slide === 1">

                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Visa Type</span>
                        <USelectMenu searchable searchable-placeholder="Search a visa type" class="w-full lg:w-48"
                            placeholder="Select visa type" v-model="questions.visa_type" :options="visaTypes"
                            value-attribute="type" option-attribute="type" />
                    </div>
                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Ever Travelled Before?</span>
                        <USelectMenu placeholder="Select an option" v-model="questions.ever_travelled_before"
                            :options="yes_no_options" />
                    </div>
                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Ever Had a Visa Refusal?</span>
                        <USelectMenu placeholder="Select an option" v-model="questions.ever_had_visa_refusal"
                            :options="yes_no_options" />
                    </div>
                </div>

                <div class=" flex flex-col gap-6" v-if="current_question_slide === 2">
                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">How will you fund your trip?</span>
                        <USelectMenu placeholder="Select an option" v-model="questions.how_fund_trip"
                            value-attribute="value" option-attribute="label" :options="visaFundOptions" />
                    </div>

                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">What do you do for a living?</span>
                        <UInput v-model="questions.occupation" placeholder="What do you do for a living?" />
                    </div>

                    <div class="flex flex-col gap-3 ">
                        <span class="font-bold">Do you have all the required documents?</span>
                        <USelectMenu placeholder="Select an option" v-model="questions.have_all_documents"
                            :options="yes_no_options" />
                    </div>

                </div>
            </div>

            <template #footer>
                <div :class="current_question_slide > 0 ? 'justify-between' : 'justify-end'" class="flex items-center">
                    <UButton v-if="current_question_slide > 0" @click="current_question_slide--" label="Previous"
                        variant="soft" icon="heroicons:arrow-small-left-20-solid" />
                    <UButton
                        @click="current_question_slide == 2 ? (intro_questions = false, getNextQuestion2()) : (current_question_slide++)"
                        :label="current_question_slide == 2 ? 'Start Interview' : 'Next'"
                        :icon="current_question_slide == 2 ? '' : 'heroicons:arrow-small-right-20-solid'"
                        :trailing="true" />
                </div>
            </template>
        </UCard>
    </UModal>

    <div class=" flex flex-col  min-h-screen h-screen">
        <div class="flex flex-col p-5">
            <span class=" font-bold">F1 Visa Interview</span>
            <span class="text-gray-500">Please provide answers to all questions..</span>
        </div>

        <!--  <form @submit.prevent="getNextQuestion2()" class="flex flex-col gap-3 p-5">
            <USkeleton v-if="loading_q" class="h-4 w-[250px]" />
            <span v-else>{{ currentQuestion }}</span>
            <div class="flex flex-col gap-3">
                <span class="font-bold">Your answer...</span>
                <UInput v-model="userAnswer" placeholder="Enter your question" />
            </div>
            <UButton class=" w-fit" label="Answer" type="submit" :loading="getting_answer"
                loading-icon="svg-spinners:12-dots-scale-rotate" />
            {{ previousAnswer }}
        </form> -->

        <!-- VO OFFICER AREA -->
        <div class="flex flex-col gap-3 justify-center items-center relative !h-[90%]">
            <div class="flex border-green-500 w-full justify-center">
                <!-- image here -->
                <div :style="`background: url('${vo_image}');`"
                    class=" h-[400px] w-full md:size-[400px] !bg-contain !bg-no-repeat !bg-center">
                </div>

                <!-- ANSWER AREA -->
                <div v-if="show_answer_pane"
                    class=" absolute w-full border-t h-[40%] bottom-0 left-0 bg-white dark:bg-gray-800">
                    <div class="flex flex-col gap-3 md:w-[50%] w-full mx-auto p-5">
                        <div class=" flex gap-3 items-start">
                            <UButton icon="heroicons:speaker-wave-solid" variant="soft" size="lg" />
                            <div class="flex flex-col gap-3 items-start w-full">
                                <div class=" flex flex-col">
                                    
                                    <div v-if="loading_q" class=" flex items-center gap-2 w-full ">
                                        <UIcon name="svg-spinners:12-dots-scale-rotate"/>
                                        <span class=" italic font-bold">VO is thinking...</span>
                                       <!--  <USkeleton class="h-4 w-[250px]" />
                                        <USkeleton class="h-4 w-[100px]" />
                                        <USkeleton class="h-4 w-[180ox]" /> -->
                                    </div>

                                    <span v-else class="font-bold text-md">{{ currentQuestion }}</span>
                                </div>

                                <form @submit.prevent="getNextQuestion2()" class="flex flex-col gap-2 w-full">
                                    <UInput v-model="userAnswer" class="w-full" size="lg"
                                        placeholder="Enter your question" />
                                    <UButton class=" w-fit" label="Answer" type="submit" :disabled="loading_q"
                                        loading-icon="svg-spinners:12-dots-scale-rotate" />
                                </form>
                            </div>
                        </div>



                        <!-- ANSWER DISPLAY AREA -->

                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import vo_image from '@/assets/images/table/vo_1.svg'
import { countries } from 'countries-list';
const countryList = Object.entries(countries).map(([code, data]) => ({
    code,
    name: data.name,
}));

console.log(countryList)

const show_answer_pane = ref(true);

const intro_questions = ref(true);

const current_question_slide = ref(0);
const questions = reactive({
    fullname: 'Odii chibuikem daniel',
    nationality: 'Nigeria',
    country_applying_to: 'United States',
    visa_type: 'Student visa',
    ever_travelled_before: 'no',
    ever_had_visa_refusal: 'no',
    how_fund_trip: '',
    occupation: '',
    have_all_documents: ''
});

const visaTypes = [
    { type: "Tourist Visa", description: "For leisure travel and short visits." },
    { type: "Business Visa", description: "For business meetings and professional activities." },
    { type: "Student Visa", description: "For studying in an educational institution abroad." },
    { type: "Work Visa", description: "For employment in a foreign country." },
    { type: "Transit Visa", description: "For short stays while traveling to another destination." }
];

const visaFundOptions = [
    { value: "self_funded", label: "Self-Funded (Personal Savings)" },
    { value: "family_sponsor", label: "Sponsored by Family/Relative" },
    { value: "employer_sponsor", label: "Sponsored by Employer" },
    { value: "scholarship", label: "Scholarship or Grant" },
    { value: "education_loan", label: "Education Loan" },
    { value: "government_sponsor", label: "Government Sponsorship" },
    { value: "business_funds", label: "Business or Corporate Sponsorship" },
    { value: "crowdfunding", label: "Crowdfunding or Public Donations" },
    { value: "combination", label: "Combination of Multiple Sources" }
];

const yes_no_options = [
    "Yes",
    "No"
];

const question = ref('What is a tourist visa?');
const answer = ref('');

const getting_answer = ref(false);
/* const getNextQuestion = async () => {
    getting_answer.value = true;
    console.log("question sent to ai: ", questions);
    const { data, error } = await useFetch('/api/answer', {
        method: 'POST',
        body: {
            candidateData: questions,
            previousAnswer: questions[question.value.length - 1],
         },
    });
    if (data.value) {
        answer.value = data.value.answer;
    } else {
        console.error(error.value);
    }
    getting_answer.value = false;
};
 */
const currentQuestion = ref('');
const userAnswer = ref('');
const previousAnswer = ref('');
const loading_q = ref(false);

const getNextQuestion2 = async () => {
    loading_q.value = true;
    try {
        const { data, error } = await useFetch('/api/answer', {
            method: 'POST',
            body: {
                candidateData: questions,
                previousAnswer: previousAnswer.value,
            },
        });

        if (error.value) {
            console.error('Error fetching question:', error.value);
            currentQuestion.value = 'Something went wrong. Please try again.';
        } else {
            currentQuestion.value = data.value.question;
            previousAnswer.value = userAnswer.value; // Store last answer
            userAnswer.value = ''; // Clear input for next answer
        }
    } catch (err) {
        console.error(err);
    }
    loading_q.value = false;
};
</script>

<style scoped></style>
