<template>
  <div class="flex h-screen">
    <div
      class="px-8 py-8 max-w-md sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-8 lg:px-12 m-auto flex-1"
    >
      <img
        class="mt-6 rounded-md shadow-xl sm:mt-8 sm:h-auto sm:w-full object-cover lg:hidden"
        src="../static/img/extension.svg"
      />
      <h2
        class="mt-10 text-2xl font-bold leading-tight lg:text-3xl xl:text-4xl"
      >
        Browser extension
      </h2>
      <p class="mt-2 text-md lg:text-2xl xl:text-3xl">
        Get the free browser extension.
      </p>
      <p class="mt-2 text-sm lg:text-1xl xl:text-2xl">
        Install the Vue Telemetry browser extension to see the technologies used
        on websites you visit at a glance.
      </p>
      <div class="mt-10 flex flex-raw justify-around lg:justify-start w-auto">
        <button
          type="re"
          class="inline-flex items-center lg:h-12 xl:h-14 w-48 px-4 py-2 mr-2 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-button-green hover:bg-button-green-hover focus:outline-none focus:bg-button-green-hover active:bg-button-green-hover transition ease-in-out duration-150"
        >
          <svg
            id="Capa_1"
            class="-ml-1 mr-3 h-5 w-5"
            fill="currentColor"
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m437.02 74.98c-48.353-48.351-112.64-74.98-181.02-74.98s-132.667 26.629-181.02 74.98c-48.351 48.353-74.98 112.64-74.98 181.02s26.629 132.667 74.98 181.02c48.353 48.351 112.64 74.98 181.02 74.98s132.667-26.629 181.02-74.98c48.351-48.353 74.98-112.64 74.98-181.02s-26.629-132.667-74.98-181.02zm-181.02-44.98c60.367 0 117.12 23.508 159.806 66.194 13.616 13.615 25.27 28.667 34.843 44.806h-194.649c-54.974 0-101.054 38.777-112.345 90.413l-65.988-114.295c5.7-7.289 11.881-14.278 18.528-20.924 42.685-42.686 99.438-66.194 159.805-66.194zm85 226c0 46.869-38.131 85-85 85s-85-38.131-85-85 38.131-85 85-85 85 38.131 85 85zm-311 0c0-39.562 10.098-77.572 29.073-111.087l96.615 167.34c.132.228.273.447.415.665 19.829 34.668 57.179 58.082 99.897 58.082 12.155 0 23.874-1.902 34.88-5.413l-65.984 114.287c-48.571-6.646-93.439-28.805-128.702-64.068-42.686-42.686-66.194-99.439-66.194-159.806zm385.806 159.806c-42.136 42.136-97.983 65.569-157.48 66.166l96.614-167.34c.111-.193.199-.392.301-.588 10.009-17.049 15.759-36.886 15.759-58.044 0-33.64-14.52-63.952-37.621-85h132.144c10.806 26.642 16.477 55.384 16.477 85 0 60.367-23.508 117.12-66.194 159.806z"
              />
            </g>
          </svg>
          Google chrome
        </button>
        <button
          type="button"
          class="inline-flex items-center lg:h-12 xl:h-14 w-48 px-4 py-2 ml-2 border border-transparent text-base leading-6 font-medium rounded-full text-white bg-button-green hover:bg-button-green-hover focus:outline-none focus:bg-button-green-hover active:bg-button-green-hover transition ease-in-out duration-150"
        >
          <svg
            x="0px"
            y="0px"
            fill="currentColor"
            class="-ml-1 mr-3 h-5 w-5"
            viewBox="0 0 512 512"
            style="enable-background: new 0 0 512 512;"
            xml:space="preserve"
          >
            <g>
              <g>
                <path
                  d="M356.192,11.136c49.44,33.6,77.92,122.208,77.92,189.216c0,17.12-2.24,33.824-6.24,49.408 c-3.584-38.944-23.616-73.216-53.44-95.488c16.48,22.24,26.272,49.632,26.272,79.456c0,73.696-59.872,133.568-133.568,133.568 c-29.824,0-44.512-5.792-66.784-22.272c45.184,0,72.992-44.512,111.296-44.512c0,0-5.536-22.272-33.376-22.272 c-27.84,0-14.688,22.272-66.784,22.272s-77.92-31.392-77.92-55.648c0-24.256,36.064-41.856,44.512-33.376 c7.584-7.584,0-22.272,0-22.272l66.816-44.512c0,0-11.136,0-22.272,0c-98.848,0-42.08-69.248-22.272-89.056 c-35.392,0-57.664,32.736-66.816,44.512c-5.568-2.656-44.512-2.656-55.648,0c-4.896,1.12-11.776-7.552-18.24-19.584 c-8-15.136-15.136-35.392-15.136-47.2c-28.256,28.288-23.36,70.592-12.224,87.264c-0.448,0.448-0.896,1.12-1.12,1.792 C11.36,158.72,0,200.576,0,244.864c0,141.344,114.656,256,256,256S512,397.344,512,256c0-2.464,0-19.808,0-22.272 C512,101.568,427.424,32.48,356.192,11.136z"
                />
              </g>
            </g>
          </svg>
          Mozilla Firefox
        </button>
      </div>
    </div>
    <div class="hidden lg:block lg:w-1/2 lg:h-auto lg:relative mr-10 flex-1">
      <img
        class="absolute h-full w-full p-5 object-center xl:object-fill"
        src="../static/img/extension.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chromeImg: {
        path: '/img/chrome.svg',
        alt: 'VueJS'
      }
    }
  }
}
</script>

<style></style>
