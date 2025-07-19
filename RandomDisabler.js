///api_version=2
(script = registerScript({
    name: "RandomDisabler",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

module = {
    values: [
        lc = value.createBoolean("LastCraft", true),
        lctiming = value.createList("LastCraft-Timing", ["Pre", "Post"], "Pre"),
        lcticks = value.createInteger("LastCraft-Ticks", 3, 3, 20),
        illegalposition = value.createBoolean("IllegalPosition", true),
        illegalpositionmode = value.createList("IllegalPosition-Mode", ["Negative", "Positive"], "Positive"),
        lessflag = value.createBoolean("LessFlag", true)
    ],
    onPacket: function(e) {
        if (illegalposition.get() && e.packet instanceof CPacketPlayer) {
            illegalpositionmode.get() == "Negative" && (e.packet.y -= 7E-9)
            illegalpositionmode.get() == "Positive" && (e.packet.y += 7E-9)
        }
        if (lessflag.get() && e.packet instanceof SPacketPlayerPosLook) {
            x = e.packet.x - mc.thePlayer.posX
            y = e.packet.y - mc.thePlayer.posY
            z = e.packet.z - mc.thePlayer.posZ
            difference = Math.sqrt(x * x + y * y + z * z)
            if (difference <= 8) {
                e.cancelEvent()
                sendPacket(new CPacketPlayer.PositionRotation(packet.x, packet.y, packet.z, packet.getYaw(), packet.getPitch(), true))
            }
        }
        if (lc.get() && e.packet instanceof CPacketVehicleMove) {
            packet = new Reflector(e.packet)
            packet.x = java.lang.Double.NEGATIVE_INFINITY;
            packet.y = java.lang.Double.NEGATIVE_INFINITY;
            packet.z = java.lang.Double.NEGATIVE_INFINITY;
            packet.yaw = java.lang.Double.NEGATIVE_INFINITY;
            packet.pitch = java.lang.Double.NEGATIVE_INFINITY;
        }
    },
    onMotion: function(e) {
        if (lc.get() && e.getEventState() == lctiming.get().toUpperCase() && mc.thePlayer.ticksExisted % lcticks.get() == 0) {
            //sendPacket(new CPacketEntityAction(mc.thePlayer, CPacketEntityAction.Action.START_FALL_FLYING));
            //sendPacket(new CPacketPlayerAbilities(mc.thePlayer.capabilities));
            sendPacket(new CPacketKeepAlive(RandomUtils.nextInt(java.lang.Integer.MIN_VALUE, java.lang.Integer.MAX_VALUE)));
            sendPacket(new CPacketInput(RandomUtils.INSTANCE.nextFloat(0.0, 18.0), RandomUtils.INSTANCE.nextFloat(0.0, 18.0), true, true));
            sendPacket(new CPacketResourcePackStatus(CPacketResourcePackStatus.Action.ACCEPTED));
            sendPacket(new CPacketSpectate(mc.thePlayer.getUniqueID()));
            sendPacket(new CPacketSteerBoat(true, true));
            sendPacket(new CPacketVehicleMove(mc.thePlayer));
            //mc.thePlayer.addStat(StatList.JUMP);
            new Reflector(mc.thePlayer).isJumping = true;
        }
    }
}
