package main.models.Lombard.TypeEnums;

/**
 * Created by kaxa on 11/29/16.
 */
public enum UzrunvelyofaStatusTypes {
    DATVIRTULI(1),
    KONFISKIREBULI(2),
    GAYIDULI(3),
    GATAVISUFLEBULI(4),
    GATANILI_PATRONIS_MIER(5);

    private int CODE;

    UzrunvelyofaStatusTypes(int i) {
        this.CODE=i;
    }

    public int getCODE() {
        return CODE;
    }
}
