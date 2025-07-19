///api_version=2
(script = registerScript({
    name: "MatrixNoFall",
    authors: ["xWhitey"],
    version: "1.337"
})).import("Core.lib");

module = {
    onPacket: function(e) {
        mc.thePlayer && e.packet && mc.thePlayer.fallDistance && e.packet instanceof C03PacketPlayer && (e.packet.onGround = mc.theWorld.getEntitiesWithinAABBExcludingEntity(mc.thePlayer, mc.thePlayer.getEntityBoundingBox().offset(0, -2, 0).expand(0, 2, 0)).isEmpty())
    }
}