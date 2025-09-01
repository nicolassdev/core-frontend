<template>
  <div class="frequently-ask-questions" :class="$q.screen.width < '768' ? 'core-bg-secondary q-pt-md' : 'q-pa-lg'">
    <h6 class="text-26 text-semibold q-my-none q-mt-sm">Hi Emma, How can we help you?
      <SearchForm route="search-questions" :class="$q.screen.width >= '768' && 'hidden'" class="q-px-lg q-mt-xl q-mb-lg" />
      <div class="text-16" :class="$q.screen.width < '768' ? 'q-mx-xl core-text-primary line-height-15' : 'text-accent-2'">Everything you need to know so you can use Olympus like a pro.</div>
      <Navigation class="q-mt-xl q-px-lg"/>
    </h6>
    <div :class="$q.screen.width < '768' && 'q-px-md q-mb-lg'">
      <div class="row" :class="$q.screen.width < '768' && 'core-bg-accent-0 q-px-lg q-pb-lg border-radius-10'">
        <div class="col-12 q-mb-xl">
          <div class="q-mt-lg">
            <p class="text-22 text-semibold">Popular on Olympus Center</p>
          </div>
            <div class="full-width" :class="$q.screen.width >= '768' && 'q-mt-lg'">
              <q-list v-for="question in popularQuestions" :key="question.id" class="q-pa-none" borderless separator>
                <div class="row">
                  <div class="col-12 col-md-7" :class="$q.screen.width < '768' && 'display-none'">
                    <div class="q-px-sm q-pt-md q-pb-sm border-bottom-accent-2 flex justify-between cursor-pointer" :class="$q.screen.width >= '1024' && 'q-mr-md'" @click="toggleQuestion('p' + question.id, 'click')" @mouseover="toggleQuestion('p' + question.id, 'mouseover')" @mouseout="toggleQuestion('p' + question.id, 'mouseout')">
                      <div class="q-mt-sm text-16 text-accent-2 transition-02s" :class="hovered && clickedItem[clickedItem.length - 1] === 'p' + question.id && 'text-hover-18'">{{question.title}}</div>
                      <q-icon size="xs" :name="$q.screen.width >= '1024' ? 'navigate_next' : hovered && clickedItem[clickedItem.length - 1] === 'p' + question.id ? 'expand_less' : 'keyboard_arrow_down'" class="q-mt-xs text-accent-2"/>
                    </div>
                  </div>
                  <div class="col-12 col-md-5 relative-position" :class="$q.screen.width >= '768' ? 'display-none' : 'display-block'" :ref="'p' + question.id">
                    <div class="bg-accent-1 box-shadow-secodary text-accent-2 q-pa-lg" :class="$q.screen.width >= '1024' ? 'absolute' : $q.screen.width < '768' ? 'border-radius-10 q-mt-md' : 'q-mt-xs'">
                      <p class="text-white text-16">{{question.title}}</p>
                      <div class="text-16 text-justify">
                        {{question.description}}
                      </div>
                    </div>
                  </div>
                </div>
              </q-list>
            </div>
        </div>
        <div class="col-12">
          <div class="q-mt-lg">
            <p class="text-22 text-semibold">Featured Questions & Answers</p>
          </div>
            <div class="full-width" :class="$q.screen.width >= '768' && 'q-mt-lg'">
              <q-list v-for="question in featuredQuestions" :key="question.id" class="q-pa-none" borderless separator>
                <div class="row">
                  <div class="col-12 col-md-7" :class="$q.screen.width < '768' && 'display-none'">
                    <div class="q-px-sm q-pt-md q-pb-sm border-bottom-accent-2 flex justify-between cursor-pointer" :class="$q.screen.width >= '1024' && 'q-mr-md'" @click="toggleQuestion('f' + question.id, 'click')" @mouseover="toggleQuestion('f' + question.id, 'mouseover')" @mouseout="toggleQuestion('f' + question.id, 'mouseout')">
                      <div class="q-mt-sm text-16 text-accent-2 transition-02s" :class="hovered && clickedItem[clickedItem.length - 1] === 'f' + question.id && 'text-hover-18'">{{question.title}}</div>
                      <q-icon size="xs" :name="$q.screen.width >= '1024' ? 'navigate_next' : hovered && clickedItem[clickedItem.length - 1] === 'f' + question.id ? 'expand_less' : 'keyboard_arrow_down'" class="q-mt-xs text-accent-2"/>
                    </div>
                  </div>
                  <div class="col-12 col-md-5 relative-position" :class="$q.screen.width >= '768' ? 'display-none' : 'display-block'" :ref="'f' + question.id">
                    <div class="bg-accent-1 box-shadow-secodary text-accent-2 q-pa-lg" :class="$q.screen.width >= '1024' ? 'absolute' : $q.screen.width < '768' ? 'border-radius-10 q-mt-md' : 'q-mt-xs'">
                      <p class="text-white text-16">{{question.title}}</p>
                      <div class="text-16 text-justify">
                        {{question.description}}
                      </div>
                    </div>
                  </div>
                </div>
              </q-list>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/FrequentlyAskQuestions"></script>
<style lang="scss">
    @import "../styles/FrequentlyAskQuestions";
</style>
