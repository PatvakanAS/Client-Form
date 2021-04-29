<template>
     <div class="container">
        <div class="formBlock">
           <form action="" @submit.prevent="checkForm">
               <div class="fullName">
                    <label for="">
                         <p>Фамилия<span class="requiredIcon">*</span></p>
                         <p class="inputContainer" :class="$v.form.lastName.$error ? 'inputError' : 'is-valid'">
                           <input 
                              type="text" 
                              name="lastName" 
                              id="lastName" 
                              ref="lastName"
                              :class="$v.form.lastName.$error ? 'is-invalid' : 'is-valid'"
                              v-model.trim="$v.form.lastName.$model"
                           >
                           <i class="fas fa-exclamation"></i>
                        </p>
                        <p class="error" v-if="$v.form.lastName.$dirty && !$v.form.lastName.required">Обязательно поле!</p>
                        <p class="error" v-if="!$v.form.lastName.minLength">Введите  {{$v.form.lastName.$params.minLength.min}}- и более символов.</p>
                        <p class="error" v-if="!$v.form.lastName.maxLength">Введите не более {{$v.form.lastName.$params.maxLength.max}} символов.</p>
                    </label>
                    <label for="">
                        <p>Имя<span class="requiredIcon">*</span></p>
                        <p class="inputContainer" :class="$v.form.firstName.$error ? 'inputError' : 'is-valid'">
                           <input 
                              type="text"
                              name="firstName"
                              id="firstName" 
                              ref="firstName"
                              :class="$v.form.firstName.$error ? 'is-invalid' : 'is-valid'"
                              v-model.trim="$v.form.firstName.$model"
                           >
                           <i class="fas fa-exclamation"></i>
                         </p>
                        <p class="error" v-if="$v.form.firstName.$dirty && !$v.form.firstName.required">Обязательно поле!</p>
                        <p class="error" v-if="!$v.form.firstName.minLength">Введите {{$v.form.firstName.$params.minLength.min}}- и более символов.</p>
                        <p class="error" v-if="!$v.form.firstName.maxLength">Введите не более {{$v.form.firstName.$params.maxLength.max}}символов.</p>
                    </label>
                    <label for="">
                         <p>Отчество</p>
                         <input
                           type="text" 
                           name="middleName" 
                           id="middleName" 
                           ref="middleName"
                           v-model.trim="form.middleName"
                         >
                    </label>
               </div>
               <div class="birthDate">
                  <label for="">
                     <p>Дата рождения<span class="requiredIcon">*</span></p>
                     <input 
                        type="date" 
                        name="dateBirth" 
                        id="dateBirth" 
                        ref="dateBirth"
                        :class="$v.form.dateBirth.$error ? 'is-invalid' : 'is-valid'"
                        v-model.trim="$v.form.dateBirth.$model"
                     >
                     <p class="error" v-if="$v.form.dateBirth.$dirty && !$v.form.dateBirth.required">Обязательно поле!</p>
                  </label>
                  <label for="">
                     <p>Номер телефона<span class="requiredIcon">*</span></p> 
                     <p class="inputContainer" :class="$v.form.phoneNumber.$error ? 'inputError' : 'is-valid'">
                        <input 
                        type="text" 
                        :class="$v.form.phoneNumber.$error ? 'is-invalid' : 'is-valid'"
                        name="phoneNumber"
                        id="phoneNumber" 
                        @input="phoneNumberMask()"
                        v-model.trim="$v.form.phoneNumber.$model"
                        >
                        <i class="fas fa-exclamation"></i>
                      </p>
                     <!-- <div v-if="($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required)" class="error">
                        <span>Пожалуйста, введите действительный номер телефона.</span> 
                     </div> -->
                     <p v-if="($v.form.phoneNumber.$model[0] != 7)" class="error">
                        <span>Номер должен начаться с 7</span> 
                     </p>
                     <p v-if="($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.minLength)" class="error">
                        <span>Введите не меньше 11 цифров.</span>
                     </p>
                     <div v-if=" ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.maxLength)" class="error">
                        <span>Введите не более 11 цифров.</span>
                     </div>
                  </label>
                  <label><span>Пол</span> 
                     <select class="gender" ref="gender" v-model="form.gender">  
                        <option v-for="(gender, index) in genders"
                        :value="gender.value"
                        :key="index"
                        >
                        {{ gender.label }}
                        </option>
                     </select>
                  </label>
               </div>
               <div class="clientGroup">
                  <label>
                     <p>Группа клиентов<span class="requiredIcon">*</span></p>
                     <select
                     id="clientGroup"
                     class="form-select"
                     multiple 
                     :class="$v.form.clientGroupList.$error ? 'is-invalid' : 'is-valid'"
                     v-model.trim="$v.form.clientGroupList.$model"
                     >
                        <option v-for="(clientGroup , index) in clientGroups"
                        :value="clientGroup.value"
                        :key="index"
                        >
                        {{ clientGroup.label }}
                        </option>
                     </select>
                     <p class="error" v-if="$v.form.clientGroupList.$dirty && !$v.form.clientGroupList.required">Обязательно поле!</p>
                  </label>
                  <label>
                     <p>Лечащий врач</p>     
                     <select id="therapist" v-model="form.therapist">
                        <option v-for="(therapist, index) in therapists"
                        :value="therapist.value"
                        :key="index"
                        >
                        {{ therapist.label }}
                        </option>
                     </select>
                  </label>
               </div>
               <div class="noMessageCheck">
                  <label for="noSendMessage">
                     <input 
                        type="checkbox" 
                        name="noSendMessage" 
                        id="noSendMessage" 
                        ref="noSendMessage" 
                        value="Не отправлять СМС" 
                        v-model="form.noSendMessage"
                     >
                     Не отправлять СМС
                  </label>
               </div>
               <div class="addresBlock">
                  <label for="">
                     <p>Индекс</p>
                     <input 
                     type="text" 
                     ref="postIndex" 
                     name="postIndex"
                     v-model.trim="form.postIndex"
                     >
                  </label>
                  <label for="">
                  <p>Страна</p>
                     <input 
                     type="text" 
                     ref="country" 
                     name="country"
                     v-model.trim="form.country"
                     >
                     </label>
                  <label for="">
                  <p>Область</p>
                     <input 
                     type="text" 
                     ref="region" 
                     name="region"
                     v-model.trim="form.region"
                     >
                  </label>
               </div>
               <div class="addresBlock">
                  <label for="">
                     <p>Город<span class="requiredIcon">*</span></p>
                     <p class="inputContainer" :class="$v.form.sityTown.$error ? 'inputError' : 'is-valid'">
                        <input 
                        type="text" 
                        ref="sityTown" 
                        name="sityTown"
                        :class="$v.form.sityTown.$error ? 'is-invalid' : 'is-valid'"
                        v-model.trim="$v.form.sityTown.$model"
                        >
                         <i class="fas fa-exclamation"></i>
                     </p>
                     <p class="error" v-if="$v.form.sityTown.$dirty && !$v.form.sityTown.required">Обязательно поле!</p>
                     <p class="error" v-if="!$v.form.sityTown.minLength">Введите {{$v.form.sityTown.$params.minLength.min}}- и более символов.</p>
                     <p class="error" v-if="!$v.form.sityTown.maxLength">Введите не более {{$v.form.sityTown.$params.maxLength.max}}символов.</p>
                  </label>
                  <label for="">
                     <p>Улица</p>
                     <input 
                     type="text" 
                     ref="theStreet" 
                     name="theStreet"
                     v-model.trim="form.theStreet"
                     >
                  </label>
                  <label for="">
                     <p>Дом</p>
                     <input 
                     type="text" 
                     ref="house" 
                     name="house"
                     v-model.trim="form.house"
                     >
                  </label>
               </div>
               <div class="passportDocuments">
                  <label>
                     <p>Тип документа<span class="requiredIcon">*</span></p>     
                     <select               
                     :class="$v.form.documentTypeList.$error ? 'is-invalid' : 'is-valid'"
                     v-model.trim="$v.form.documentTypeList.$model"       
                     >
                        <option v-for="(documentType, index) in documentTypes"
                        :value="documentType.value"
                        :key="index"
                        >
                        {{ documentType.label }}
                        </option>
                     </select>
                     <p class="error" v-if="$v.form.documentTypeList.$dirty && !$v.form.documentTypeList.required">Обязательно поле!</p>
                  </label>
                  <label for="">
                     <p>Серия</p>
                     <input 
                     type="text" 
                     ref="passportSeria" 
                     name="passportSeria"
                     v-model.trim="form.passportSeria"
                     >
                  </label>
                  <label for="">
                     <p>Номер</p>
                     <input 
                     type="number" 
                     ref="passportNumber" 
                     name="passportNumber"
                     v-model="form.passportNumber"
                     >
                  </label>
               </div>
               <div class="dateissue">
                  <label for="">
                     <p>Кем выдан</p>
                     <input 
                     type="text" 
                     ref="issuedBy"
                     v-model.trim="form.issuedBy"
                     >
                  </label>
                  <label for="">
                     <p>Дата выдачи<span class="requiredIcon">*</span></p>
                     <input 
                     type="date" 
                     ref="dateOfIssue"
                     :class="$v.form.dateOfIssue.$error ? 'is-invalid' : 'is-valid'"
                     v-model.trim="$v.form.dateOfIssue.$model"
                     >
                     <p class="error" v-if="$v.form.dateOfIssue.$dirty && !$v.form.dateOfIssue.required">Обязательно поле!</p>
                     <!-- <p class="error" v-if="!$v.form.dateOfIssue.minLength">Введите {{$v.form.dateOfIssue.$params.minLength.min}}- и более символов.</p>
                     <p class="error" v-if="!$v.form.dateOfIssue.maxLength">Введите не более {{$v.form.dateOfIssue.$params.maxLength.max}}символов.</p>
                   -->
                  </label>
               </div>
               <button type="submit" id="btn"> Создать</button>
          </form>
        </div>

     </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
const touchMap = new WeakMap()

export default {
   
   data(){
      return {
         form: {
            lastName: "",
            firstName: "",
            middleName: "",
            dateBirth: "",
            phoneNumber: "7",
            noSendMessage: "",
            postIndex: "",
            country: "",
            region: "",
            sityTown: "",
            theStreet: "",
            house: "",
            passportSeria: "",
            passportNumber: "",
            issuedBy: "",
            dateOfIssue: "",
            gender: "Male",
            therapist: "Ivanov",
            clientGroupList: [],
            documentTypeList: ""
         },
          genders: [
             {
              label: "Мужской",
              value: "Male"
             },
             {
              label: "Женский",
              value: "Female"
             }
          ],
         clientGroups: [
           {
              label: "VIP",
              value: "VIP"
           },
           {
              label: "Проблемные",
              value: "problems"
           },
           {
              label: "ОМС",
              value: "OMS"
           }
        ],
         options: [
         {
            language: 'Javascript',
            libs: [
               { name: 'Vue.js', category: 'Front-end' },
               { name: 'Adonis', category: 'Backend' }
            ]
         },
         {
            language: 'Ruby',
            libs: [
               { name: 'Rails', category: 'Backend' },
               { name: 'Sinatra', category: 'Backend' }
            ]
         },
         {
            language: 'Other',
            libs: [
               { name: 'Laravel', category: 'Backend' },
               { name: 'Phoenix', category: 'Backend' }
            ]
         }
         ],
        therapists: [
           {
              label: "Иванов",
              value: "Ivanov"
           },
           {
              label: "Захаров",
              value: "Zakharov"
           },
           {
              label: "Чернышева",
              value: "Chernishova"
           }
        ],
        documentTypes: [
           {
              label: "Паспорт",
              value: "Passport"
           },
           {
              label: "Свидетельство о рождении",
              value: "BirthCertificate"
           },
           {
              label: "Вод. удостоверение",
              value: "driverLicense"
           }
        ]
      }
   },
   validations: {
      form: {
         lastName: { 
            required, 
            minLength: minLength(3),
            maxLength: maxLength(15),
         },
         firstName: { 
            required, 
            minLength: minLength(3),
            maxLength: maxLength(15),
         },
         sityTown: { 
            required, 
            minLength: minLength(3),
            maxLength: maxLength(20),
         },
         dateBirth: {
            required, 
         },
         phoneNumber: {
          required,
          minLength: minLength(13),
          maxLength: maxLength(13),
          firstNumber: 7
         },
         dateOfIssue: { 
            required,             
         },
         clientGroupList: {
            required,
         },
         documentTypeList: {
            required,
         }
      }
   },
   methods: {
      delayTouch($v) {
      $v.$reset()
      if (touchMap.has($v)) {
         clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1000))
      },
      phoneNumberMask(){
         const x = this.form.phoneNumber.replace(/\D/g, '').match(/(\d{0,1})(\d{0,5})(\d{0,5})/);
         this.form.phoneNumber = !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
      },
      checkForm() {
         this.$v.form.$touch();
         if(!this.$v.form.$error){
            this.$router.push("/client")
         } else {
            // alert("validate invalid");
         }
      }
   },
}
</script>

<style lang="scss">
@import "@/assets/clientForm.scss";
</style>
