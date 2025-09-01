
import _ from "lodash";
import {
  AllowedFunctions,
  FetchAllowedFunctions,
  ModuleFunctions,
  isPermissionsEdited,
} from "src/core/composables/UserManagement";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    let store = useStore();
    const router = useRouter();
    const route = useRoute();

    let showInnerLoading = ref(true);
    /** System App Permission */

    // Container of all function ids selected
    let functionIds = ref(AllowedFunctions.value);
    // Container of all module names
    let permissions = ref(ModuleFunctions.value);
    // Container of modules and functions
    let systemModules = ref([]);
    // Container of total number of functions ids
    let totalNumberofFunctionIds = ref(0);
    // Container of list of function ids
    let listOfFunctionIds = ref([]);
    // Container of list of module names
    let listModulesNames = ref([]);
    /** Get user permission including system and functionalities */

    let selectALLPermissions = ref(false);

    onMounted(() => {
      getUserPermission()
    });

    const getUserPermission = () => {
      store.dispatch("Core/Permissions/FETCH_SYSTEMS").then((response) => {
        if (response.status === "success") {
          systemModules.value = Object.entries(
            response.data[route.params.system_name].modules
          );
          // Get total number of function ids
          systemModules.value.forEach((module) => {
            totalNumberofFunctionIds.value += module[1].functions.length;
            // Get all module names
            listModulesNames.value.push(module[0]);
            // Get all function ids
            module[1].functions.forEach((f) => {
              listOfFunctionIds.value.push(f.id);
            });
          });

          if (route.params.account_id) {
            if (
              functionIds.value.length &&
              !functionIds.value.some(id => listOfFunctionIds.value.includes(id)) &&
              (route.params.system_name in isPermissionsEdited && !isPermissionsEdited.value[route.params.system_name])
            ) {
              FetchAllowedFunctions({ id: route.params.account_id, }).then((response) => {
                if (response.data.length && response.data[0].allowed_functions.length) {
                  functionIds.value = response.data[0].allowed_functions;
                }
              })
            }
          }

          selectALLPermissions.value = listOfFunctionIds.value.every(id => functionIds.value.includes(id))
          showInnerLoading.value = false;
        }
      });
    };

    // Pass selected ids to the global variable | Used to update the user form
    watch(
      () => _.cloneDeep(functionIds.value),
      () => {
        route.params.system_name && (isPermissionsEdited.value[route.params.system_name] = true)

        AllowedFunctions.value = functionIds.value

        selectALLPermissions.value = listOfFunctionIds.value.every(id => functionIds.value.includes(id))
      }
    );

    // Pass selected module ids to the global variable | Used to update the select all per module
    watch(
      () => _.cloneDeep(permissions.value),
      () => {
        ModuleFunctions.value = permissions.value;
      }
    );

    const selectAllFunctions = (toggledBy, data = null) => {
      if (toggledBy === "parent") {
        if (
          selectALLPermissions.value
          //   &&   totalNumberofFunctionIds.value !== functionIds.value.length
        ) {
          listOfFunctionIds.value.forEach((id) => {
            functionIds.value.push(id);
          });
          listModulesNames.value.forEach((id) => {
            permissions.value.push(id);
          });
        } else {
          functionIds.value = functionIds.value.filter(
            (id) => !listOfFunctionIds.value.includes(id)
          );
          permissions.value = permissions.value.filter(
            (id) => !listModulesNames.value.includes(id)
          );
        }
      } else if (toggledBy === "subParent") {
        data.functions.forEach((f) => {
          // Push module function ids to functionIds if not exist
          let index = functionIds.value.findIndex((id) => id === f.id);
          index === -1 && functionIds.value.push(f.id);
        });

        let moduleIndex = permissions.value.findIndex((p) => p === data.name);
        if (moduleIndex === -1) {
          // remove all ids
          data.functions.forEach((f) => {
            let index = functionIds.value.findIndex((id) => id === f.id);
            index !== -1 && functionIds.value.splice(index, 1);
          });
        }
      } else {
        // Identifies if atleast one id of module function is removed in the list of functionIds selected
        let isIdRemoved = false;
        data.functions.forEach((f) => {
          let indexOfFunctionId = functionIds.value.findIndex((id) => id === f.id);
          indexOfFunctionId === -1 && (isIdRemoved = true);
        });

        if (isIdRemoved) {
          // Turn off the select all from the module
          let moduleIndex = permissions.value.findIndex((p) => p === data.name);
          moduleIndex !== -1 && permissions.value.splice(moduleIndex, 1);
        } else {
          // Turn on
          let indexOfModuleName = permissions.value.findIndex(
            (module) => module === data.name
          );
          indexOfModuleName === -1 && permissions.value.push(data.name);
        }
      }
    };

    /** END ------------------------- */

    return {
      // Triggers
      showInnerLoading,
      /**
       * System App Permission
       * Start
       */
      systemModules,
      functionIds,
      getUserPermission,
      selectALLPermissions,
      permissions,
      selectAllFunctions,
      /** END -------------- */
    };
  },
};