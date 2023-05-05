const APP_ID = "fd34bf65498f46b49872aed149eb3d49"
const CHANNEL = 'mainch'
const TOKEN = "007eJxTYCizFvgpek9bhFHzgb9n1nLT2Z4TJUUuvtJ6OedjQkNRnIYCQ1qKsUlSmpmpiaVFmolZEpAyN0pMTTE0sUxNMk4xsWx9EJLSEMjIkDl5LzMjAyMDCxCD+ExgkhlMsoBJNobcxMy85AwGBgAZASE/"
let UID;

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    client.on('user-published', handleuserjoined)
    client.on('user-left', handleuserleft )

    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class"username-wrapper><span class"user-name">My Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                    </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let handleuserjoined = async (user,mediatype) => {
        remoteUsers[user.uid] = user
        await client.subscribe(user, mediaType)
        if(mediaType == 'video'){
            let player = document.getElementById(`user-container-$(user.uid)`)
            if(player != null){
                player.remove()
            }
            player = `<div class="video-container" id="user-container-${user.uid}">
                <div class"username-wrapper><span class"user-name">My Name</span></div>
                <div class="video-player" id="user-${user.uid}"></div>
                </div>`
            document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
            user.videoTrack.play(`user-${user.uid}`)
        }

        if(mediaType == 'audio'){
            user.audioTrack.play()
        }
}
let handleuserleft = async(user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove() 
}

joinAndDisplayLocalStream()