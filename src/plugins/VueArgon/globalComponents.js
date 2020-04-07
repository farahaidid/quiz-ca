import Badge from "@/components/VueArgon/Badge";
import BaseAlert from "@/components/VueArgon/BaseAlert";
import BaseButton from "@/components/VueArgon/BaseButton";
import BaseCheckbox from "@/components/VueArgon/BaseCheckbox";
import BaseInput from "@/components/VueArgon/BaseInput";
import BasePagination from "@/components/VueArgon/BasePagination";
import BaseProgress from "@/components/VueArgon/BaseProgress";
import BaseRadio from "@/components/VueArgon/BaseRadio";
import BaseSlider from "@/components/VueArgon/BaseSlider";
import BaseSwitch from "@/components/VueArgon/BaseSwitch";
import Card from "@/components/VueArgon/Card";
import Icon from "@/components/VueArgon/Icon";

export default {
  install(Vue) {
    Vue.component(Badge.name, Badge);
    Vue.component(BaseAlert.name, BaseAlert);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BasePagination.name, BasePagination);
    Vue.component(BaseProgress.name, BaseProgress);
    Vue.component(BaseRadio.name, BaseRadio);
    Vue.component(BaseSlider.name, BaseSlider);
    Vue.component(BaseSwitch.name, BaseSwitch);
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  }
};
