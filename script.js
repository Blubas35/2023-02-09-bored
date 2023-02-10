const form = document.querySelector('#form')
const selectElement = document.querySelector('#activity-type')
const selectParticipantsElement = document.querySelector('#participants')
const selectAccessibilityElement = document.querySelector('#accessibility')
const selectedInputButton = document.querySelector('#selected-input')
const inputButton = document.querySelector('#input')
const container = document.querySelector('.container')
const priceRangeInputLeft = document.querySelector('#price-range-left')
const priceRangeInputRight = document.querySelector('#price-range-right')
const priceAccessibilityInputLeft = document.querySelector('#accessibility-range-left')
const priceAccessibilityInputRight = document.querySelector('#accessibility-range-right')


let typesArr = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
let participantsArr = [1, 2, 3, 4, 5, 6, 7, 8]

function getActivity(type, minPrice, maxPrice, participants, minAccessibility, maxAccessibility) {

    const activityWrapper = document.createElement('div')
    activityWrapper.className = 'activity-wrapper'
    const activityElement = document.createElement('p')
    activityElement.className = 'activity-name'
    const activityTypeElement = document.createElement('p')
    activityTypeElement.className = 'activity-type-name'
    const participantElement = document.createElement('p')
    participantElement.className = 'participant-count'
    const priceElement = document.createElement('p')
    priceElement.className = 'price'
    const linkElementWrapper = document.createElement('p')
    linkElementWrapper.className = 'link-wrapper'
    const linkElement = document.createElement('a')
    linkElement.className = 'link'
    const hrefElement = document.createElement('href')
    const accessibilityElement = document.createElement('p')
    accessibilityElement.className = 'accessibility-rating'

    linkElement.append(hrefElement)
    linkElementWrapper.append(linkElement)
    activityWrapper.append(activityElement, activityTypeElement, participantElement, priceElement, linkElementWrapper, accessibilityElement)
    container.append(activityWrapper)

    fetch(`http://www.boredapi.com/api/activity?type=${type}&minprice=${minPrice}&maxprice=${maxPrice}&participants=${participants}&minaccessibility=${minAccessibility}&maxaccessibility=${maxAccessibility}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            activityWrapper.textContent = 'Sorry, couldn\'t find activity with these options :('
            activityWrapper.className += ' new'
            return
        }
        const activity = data.activity
        const type = data.type[0].toUpperCase() + data.type.slice(1)
        const participants = data.participants
        const price = data.price * 10
        const link = data.link
        const accessibility = data.accessibility * 10

        activityElement.textContent = `Activity to do: ${activity}`
        activityTypeElement.textContent = `Activity type: ${type}`
        participantElement.textContent = `Participants required for the activity: ${participants}`
        priceElement.textContent = `Expenses rating (0 being not expensive at all, while 10 being expensive): ${price}/10`
        hrefElement.textContent = `More information about activity: ${link}`
        accessibilityElement.textContent = `Accessibility rating: ${accessibility}/10`
        activityWrapper.className += ' new'
    })

}
function listTypeActivity(arr) {
    let firstOptionElement = document.createElement('option')
    firstOptionElement.textContent = 'Any'
    firstOptionElement.value = ''
    selectElement.append(firstOptionElement)

    arr.map(type => {
        let optionElement = document.createElement('option')
        optionElement.textContent = type.charAt(0).toUpperCase() + type.slice(1)
        optionElement.value = type
        selectElement.append(optionElement)
    })
}
listTypeActivity(typesArr)

function listParticipants(arr) {
    let firstOptionElement = document.createElement('option')
    firstOptionElement.textContent = 'Any'
    firstOptionElement.value = ''
    selectParticipantsElement.append(firstOptionElement)

    arr.map(price => {
        let participantsOptionElement = document.createElement('option')
        participantsOptionElement.textContent = price
        participantsOptionElement.value = price
        selectParticipantsElement.append(participantsOptionElement)
    })
}
listParticipants(participantsArr)

function removePrevious() {
    let previousElement = document.querySelector('.new')
    if(previousElement) {
        previousElement.remove()
    }
}

inputButton.addEventListener('click', (event) => {
    event.preventDefault()
    
    const activityWrapper = document.createElement('div')
    activityWrapper.className = 'activity-wrapper'
    const activityElement = document.createElement('p')
    activityElement.className = 'activity-name'
    const activityTypeElement = document.createElement('p')
    activityTypeElement.className = 'activity-type-name'
    const participantElement = document.createElement('p')
    participantElement.className = 'participant-count'
    const priceElement = document.createElement('p')
    priceElement.className = 'price'
    const linkElementWrapper = document.createElement('p')
    linkElementWrapper.className = 'link-wrapper'
    const linkElement = document.createElement('a')
    linkElement.className = 'link'
    const hrefElement = document.createElement('href')
    const accessibilityElement = document.createElement('p')
    accessibilityElement.className = 'accessibility-rating'

    linkElement.append(hrefElement)
    linkElementWrapper.append(linkElement)
    activityWrapper.append(activityElement, activityTypeElement, participantElement, priceElement, linkElementWrapper, accessibilityElement)
    container.append(activityWrapper)

    fetch("http://www.boredapi.com/api/activity/")
        .then(res => res.json())
        .then(data => {
            const activity = data.activity
            const type = data.type[0].toUpperCase() + data.type.slice(1)
            const participants = data.participants
            const price = data.price * 10
            const link = data.link
            const accessibility = data.accessibility * 10

            activityElement.textContent = `Activity to do: ${activity}`
            activityTypeElement.textContent = `Activity type: ${type}`
            participantElement.textContent = `Participants required for the activity: ${participants}`
            priceElement.textContent = `Expenses rating (0 being not expensive at all, while 10 being expensive): ${price}/10`
            hrefElement.textContent = `More information about activity: ${link}`
            accessibilityElement.textContent = `Accessibility rating: ${accessibility}/10`
            activityWrapper.className += ' new'
        })
    removePrevious()
})

selectedInputButton.addEventListener('click', (event) => {
    event.preventDefault()

    selectedType = selectElement.value
    selectedPriceLeft = priceRangeInputLeft.value / 10
    selectedPriceRight = priceRangeInputRight.value / 10
    selectedParticipants = selectParticipantsElement.value
    selectedAccessibilityLeft = priceAccessibilityInputLeft.value / 10
    selectedAccessibilityRight = priceAccessibilityInputRight.value / 10

    getActivity(selectedType, selectedPriceLeft, selectedPriceRight, selectedParticipants, selectedAccessibilityLeft, selectedAccessibilityRight)
    removePrevious()

})
