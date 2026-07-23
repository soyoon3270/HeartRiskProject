
const analysisData = {

age:{

under30:{
title:"Age: Under 30",
average:"Cardiovascular disease is relatively uncommon in this age group.",
explanation:"Although the short-term risk is generally low, developing healthy habits early—such as regular exercise, a balanced diet, and avoiding smoking—helps reduce lifetime cardiovascular risk."
},

"30-39":{
title:"Age: 30–39",
average:"Cardiovascular risk begins to increase gradually during adulthood.",
explanation:"Risk factors like elevated cholesterol or high blood pressure may start developing silently. Routine health screenings become increasingly important."
},

"40-49":{
title:"Age: 40–49",
average:"Heart disease becomes noticeably more common after age 40.",
explanation:"Maintaining healthy blood pressure, cholesterol, and body weight can significantly lower future cardiovascular risk."
},

"50-59":{
title:"Age: 50–59",
average:"Many cardiovascular events begin occurring more frequently during this decade.",
explanation:"Lifestyle choices continue to have a major influence. Regular medical checkups are strongly recommended."
},

"60-69":{
title:"Age: 60–69",
average:"Older adults experience substantially higher rates of cardiovascular disease.",
explanation:"Arteries naturally stiffen with age, increasing blood pressure and cardiovascular strain. Healthy habits remain highly beneficial."
},

"70plus":{
title:"Age: 70+",
average:"Cardiovascular disease becomes increasingly common in this age group.",
explanation:"Age is a major non-modifiable risk factor, but treatment adherence and lifestyle choices continue to improve long-term outcomes."
}

},

bmi:{

underweight:{
title:"BMI",
average:"Being underweight may sometimes indicate nutritional deficiencies.",
explanation:"Although obesity receives more attention, being significantly underweight can also affect cardiovascular and overall health."
},

healthy:{
title:"BMI",
average:"A healthy BMI is generally associated with lower cardiovascular risk.",
explanation:"Maintaining a healthy weight supports healthy blood pressure, cholesterol, and glucose levels."
},

overweight:{
title:"BMI",
average:"Overweight individuals have an increased likelihood of developing hypertension and diabetes.",
explanation:"Losing even a modest amount of weight can improve cardiovascular health."
},

obese:{
title:"BMI",
average:"Obesity is one of the strongest modifiable cardiovascular risk factors.",
explanation:"Excess body fat increases strain on the heart and contributes to high blood pressure, diabetes, and elevated cholesterol."
}

},

exercise:{

"5":{
title:"Exercise",
average:"Meeting recommended activity levels is associated with lower cardiovascular risk.",
explanation:"Excellent! Regular exercise strengthens the heart and improves circulation."
},

"3":{
title:"Exercise",
average:"Moderate exercise provides significant cardiovascular benefits.",
explanation:"Increasing activity to most days of the week may provide additional health benefits."
},

"1":{
title:"Exercise",
average:"Limited physical activity provides some benefit but may not meet health recommendations.",
explanation:"Increasing exercise frequency could help reduce long-term cardiovascular risk."
},

"0":{
title:"Exercise",
average:"Physical inactivity is associated with increased cardiovascular disease.",
explanation:"Try to gradually increase your weekly activity. Even brisk walking can improve heart health."
}

},

smoking:{

never:{
title:"Smoking",
average:"Non-smokers generally have the lowest cardiovascular risk.",
explanation:"Avoiding tobacco protects blood vessels and lowers heart attack and stroke risk."
},

former:{
title:"Smoking",
average:"Former smokers gradually reduce their cardiovascular risk over time.",
explanation:"Remaining smoke-free allows your heart and blood vessels to recover."
},

sometimes:{
title:"Smoking",
average:"Even occasional smoking increases cardiovascular risk.",
explanation:"There is no completely safe level of tobacco exposure."
},

daily:{
title:"Smoking",
average:"Daily smokers have substantially higher cardiovascular risk than non-smokers.",
explanation:"Quitting smoking is one of the most effective ways to improve heart health."
}

},

bp:{

yes:{
title:"Blood Pressure",
average:"Hypertension is a leading contributor to heart disease and stroke.",
explanation:"Managing blood pressure through lifestyle changes and medication when prescribed can greatly reduce cardiovascular risk."
},

unsure:{
title:"Blood Pressure",
average:"Many people with hypertension are unaware they have it.",
explanation:"Consider having your blood pressure checked regularly."
},

no:{
title:"Blood Pressure",
average:"Normal blood pressure supports healthy arteries and heart function.",
explanation:"Continue monitoring your blood pressure during routine medical visits."
}

},

cholesterol:{

yes:{
title:"Cholesterol",
average:"High cholesterol contributes to plaque buildup in arteries.",
explanation:"Healthy eating, exercise, and medication when prescribed can lower cholesterol levels."
},

no:{
title:"Cholesterol",
average:"Healthy cholesterol levels reduce cardiovascular risk.",
explanation:"Continue following heart-healthy lifestyle habits."
}

},

family:{

yes:{
title:"Family History",
average:"A family history of cardiovascular disease increases inherited risk.",
explanation:"Although genetics cannot be changed, maintaining healthy habits can significantly reduce overall risk."
},

no:{
title:"Family History",
average:"No known family history reduces inherited cardiovascular risk.",
explanation:"Lifestyle remains the strongest factor you can control."
},

unsure: {
  title: "Family History",
  average: "Not knowing your family history makes inherited cardiovascular risk harder to estimate.",
  explanation: "If possible, ask family members about any history of heart disease. Even without this information, maintaining healthy habits remains important."
}
  
}

};
