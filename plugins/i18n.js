import ar_s from '../assets/lang/ar.js'
import de_s from '../assets/lang/de.js'
import en_s from '../assets/lang/en.js'
import es_s from '../assets/lang/es.js'
import fr_s from '../assets/lang/fr.js'
import it_s from '../assets/lang/it.js'
import ja_s from '../assets/lang/ja.js'
import ko_s from '../assets/lang/ko.js'
import pt_s from '../assets/lang/pt.js'
import ru_s from '../assets/lang/ru.js'
import zh_Hans_s from '../assets/lang/zh_Hans.js'
import zh_Hant_s from '../assets/lang/zh_Hant.js'

const i18n = {
  //有多少地区的语言就添加多少种
  locales: ["ar", "de", "en", "es", "fr", "it", "ja", "ko", "pt", "ru", "zh_Hans", "zh_Hant"],
  defaultLocale: 'zh_Hans',//默认的地区语言
  vueI18n: {
    //回退策略，指定的locale中没有找到对应资源的情况下使用的locale
    fallbackLocale: 'zh_Hans',
    //要渲染的信息，有多少语言就添加多少种
    messages: {
      ar: ar_s,
      de: de_s,
      en: en_s,
      es: es_s,
      fr: fr_s,
      it: it_s,
      ja: ja_s,
      ko: ko_s,
      pt: pt_s,
      ru: ru_s,
      zh_Hans: zh_Hans_s,
      zh_Hant: zh_Hant_s
    }
  }
}
export default i18n
