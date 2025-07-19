///api_version=2
(script = registerScript({
    name: "Flight",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

list = [
    mode = value.createList("Mode", ["LastCraft", "LastCraft-SmoothVanilla", "OtherHypixel", "LatestHypixel", "LastCraft2"], "OtherHypixel"),
    lastCraftSmoothVanillaSpeed = value.createFloat("LastCraft-SmoothVanilla-Speed", 0.1, 0.1, 0.3),
    resetXYZ = value.createBoolean("Reset-Motion", false),
    packetVanillaSpeed = value.createFloat("LastCraft2-VanillaSpeed", 2.0, 0.0, 5.0),
    packetSpeed = value.createFloat("LastCraft2-Speed", 0.125, 0.125, 5),    
    packetYSpeed = value.createFloat("LastCraft2-YSpeed", 0.125, 0.125, 5),
    packetInstant = value.createBoolean("LastCraft2-Instant", true),
    packetVanillaKickBypass = value.createBoolean("LastCraft2-VanillaKickBypass", true),
    packetSendAdditionalMoves = value.createBoolean("LastCraft2-SendAdditionalMoves", true)
]

Math.toRadians = function(degrees) {
    return degrees * Math.PI / 180;
};

module = {
    values: list,
    description: "Different flight modes, that can make you fly.",
    category: "Movement",
    onEnable: function() {
        mode.get().equalsIgnoreCase("LastCraft") && timer.reset() && flightTimer.reset()
    },
    onDisable: function() {
        resetXYZ.get() && (mc.thePlayer.motionX = mc.thePlayer.motionY = mc.thePlayer.motionZ = 0)
        timer.reset() && flightTimer.reset()
    },
    onUpdate: function() {
        if (mode.get().equalsIgnoreCase("LastCraft-SmoothVanilla")) {
            mc.thePlayer.motionY = 0.0
            if (mc.gameSettings.keyBindForward.pressed && !mc.thePlayer.onGround) {
                var f = Math.toRadians(mc.thePlayer.rotationYaw)
                mc.thePlayer.motionX -= (Math.sin(f) * lastCraftSmoothVanillaSpeed.get())
                mc.thePlayer.motionZ += (Math.cos(f) * lastCraftSmoothVanillaSpeed.get())
            }

            if (mc.gameSettings.keyBindJump.pressed) {
                mc.thePlayer.motionY = 0.5
            }

            if (mc.gameSettings.keyBindSneak.pressed) {
                mc.thePlayer.motionY -= 0.5
            }
        }
        if (mode.get().equalsIgnoreCase("LastCraft")) {
            if (mc.gameSettings.keyBindForward.pressed) {
                //if (flightTimer.hasTimePassed(100)) {
                    var f = Math.toRadians(mc.thePlayer.rotationYaw)
                    //old way to have infinite fly
                    //mc.thePlayer.setPosition(mc.thePlayer.posX + -Math.sin(yaw) * 0.1, mc.thePlayer.posY, mc.thePlayer.posZ + Math.cos(yaw) * 0.1)
                    mc.thePlayer.motionX -= (Math.sin(f) * 0.2)
                    mc.thePlayer.motionZ += (Math.cos(f) * 0.2)
                    //flightTimer.reset()
                //}
            }
        }
        if (mode.get().equalsIgnoreCase("LastCraft2")) {
            mc.thePlayer.motionY = mc.thePlayer.motionX = mc.thePlayer.motionZ = 0;
            MovementUtils.strafe(packetVanillaSpeed.get())
            if (packetInstant.get()) {
                if (MovementUtils.isMoving()) {
                    sendPacket(new C04(mc.thePlayer.posX, mc.thePlayer.posY + 10, mc.thePlayer.posZ, mc.thePlayer.onGround));
                }
            }
            if (packetVanillaKickBypass.get()) {
                new Reflector(FlyModule).handleVanillaKickBypass();
            }
            if (packetSendAdditionalMoves.get()) {
                sendPacket(new C04(mc.thePlayer.posX + -Math.sin(MovementUtils.getDirection()) * packetSpeed.get(), mc.thePlayer.posY, mc.thePlayer.posZ + Math.cos(MovementUtils.getDirection()) * packetSpeed.get(), mc.thePlayer.onGround));
            }
        }
        !mode.get().equalsIgnoreCase("LastCraft-SmoothVanilla") && !mode.get().equalsIgnoreCase("OtherHypixel") && !mode.get().equalsIgnoreCase("LastCraft2") && (mc.thePlayer.motionY = 0, mc.thePlayer.onGround = true)
        FlightModule.tag = mode.get()
    },
    onMove: function(e) {
        (!timer.hasTimePassed(2000) && mode.get().equalsIgnoreCase("LastCraft") && e.zero())
    },
    onJump: function(e) {
        e.cancelEvent()
    },
    onPacket: function(e) {
        if (mc.thePlayer && mode.get().equalsIgnoreCase("LastCraft2") && e.getPacket() instanceof CPacketPlayer) {
            if (MovementUtils.isMoving()) {
                e.getPacket().field_149479_a += -Math.sin(MovementUtils.getDirection()) * packetSpeed.get();
                e.getPacket().field_149478_c += Math.cos(MovementUtils.getDirection()) * packetSpeed.get();
            }
            e.getPacket().field_149477_b += 0.125;
            if (mc.gameSettings.keyBindJump.pressed) {
                e.getPacket().field_149477_b += packetYSpeed.get();
            }
            if (mc.gameSettings.keyBindSneak.pressed) {
                e.getPacket().field_149477_b -= packetYSpeed.get();
            }
        }
    }
    
}

function ATimer() {
    this.time = System.currentTimeMillis();
    this.hasTimePassed = function (ms) System.currentTimeMillis() >= this.time + ms;
    this.getTimePassed = function () System.currentTimeMillis() - this.time;
    this.reset = function () this.time = System.currentTimeMillis();
}

System = Java.type("java.lang.System");
//C04 = Java.type("net.minecraft.network.play.client.CPacketPlayer.CPacketPlayerPosition");
C04 = Java.type("net.minecraft.network.play.client.CPacketPlayer.Position");
var timer = new ATimer(), flightTimer = new ATimer();